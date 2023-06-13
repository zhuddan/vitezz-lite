import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { HttpHandlers, HttpRequestOption, Result, isReturnNativeResponseHttpRequestOption } from './types';

import Qs from 'qs';
import { HttpRequestHeadersContentTypeEnum, HttpRequestMethodsEnum } from './types';
import { HttpRequestDeduplicator } from './HttpRequestDeduplicator';
import axios, { isAxiosError } from 'axios';
import { merge } from 'lodash-es';
import { HttpRequestError } from './HttpRequestError';
import { isHttpRequestError } from './helpers';

export class HttpRequest {
  /**
   * @description axios 实例
   */
  private axiosInstance: AxiosInstance;
  /**
   * @description 参数
   */
  private options: HttpRequestOption;
  /**
   * @description 处理方法
   */
  private requestCallbacks: HttpHandlers;
  /**
   * @description 取消重复请求
   */
  requestDeduplicator = new HttpRequestDeduplicator();
  constructor(options: HttpRequestOption, requestHandlers: HttpHandlers = {}) {
    this.requestCallbacks = requestHandlers;
    this.axiosInstance = axios.create({
      ...options,
    });
    this.options = options;
    this.setupInterceptors();
  }

  private getErrorMessageByCode(code?: string): string {
    switch (code) {
      case 'ERR_BAD_OPTION_VALUE':
        return '选项设置了错误的值';
      case 'ERR_BAD_OPTION':
        return '无效的或不支持的选项';
      case 'ECONNABORTED':
        return '网络连接被中断，通常因为请求超时';
      case 'ETIMEDOUT':
        return '操作超时';
      case 'ERR_NETWORK':
        return '网络错误';
      case 'ERR_FR_TOO_MANY_REDIRECTS':
        return '请求被重定向了太多次，可能导致无限循环';
      case 'ERR_DEPRECATED':
        return '使用了已被废弃的函数或方法';
      case 'ERR_BAD_RESPONSE':
        return '从服务器接收到无效或错误的响应';
      case 'ERR_BAD_REQUEST':
        return '发送的请求格式错误或无效';
      case 'ERR_CANCELED':
        return '请求已经被取消';
      case 'ERR_NOT_SUPPORT':
        return '使用的某个功能或方法不被支持';
      case 'ERR_INVALID_URL':
        return '提供的URL无效';
      default:
        return '未知错误';
    }
  }

  private getErrorMessageByStatus(status: number) {
    switch (status) {
      case 400:
        return '错误请求，服务器无法理解请求的格式';
      case 401:
        return '未授权，请求要求用户的身份认证';
      case 403:
        return '禁止访问';
      case 404:
        return '服务器无法根据客户端的请求找到资源';
      case 405:
        return '网络请求错误,请求方法未允许!';
      case 408:
        return '网络请求超时!';
      case 500:
        return '服务器内部错误，无法完成请求';
      case 502:
        return '网关错误';
      case 503:
        return '服务器目前无法使用（由于超载或停机维护）';
      case 504:
        return '网络超时!';
      case 505:
        return 'http版本不支持该请求!';
      default:
        return '未知错误';
    }
  }

  private getOptions(config: InternalAxiosRequestConfig) {
    return merge({ ...this.options }, { ...config });
  }

  /**
   * @description 请求拦截器 https://axios-http.com/zh/docs/interceptors
   */
  private setupInterceptors() {
    // 是否忽略请求
    const addIgnoreCancelTokenInterceptor = (config: InternalAxiosRequestConfig) => {
      const options = this.getOptions(config);
      // 如果不忽略重复请求则 addPending
      if (!options.ignoreRepeatRequest)
        this.requestDeduplicator.addPending(config);
      return config;
    };
    this.axiosInstance.interceptors.request.use(addIgnoreCancelTokenInterceptor);

    // 添加 token
    const addTokenInterceptor = (config: InternalAxiosRequestConfig) => {
      const options = this.getOptions(config);
      if (options.withToken === true) {
        const token = this.requestCallbacks?.getToken?.();
        if (token) {
          config.headers[`${options?.tokenKey}`] = options.authenticationScheme
            ? `${this.options.authenticationScheme} ${token}`
            : token;
        }
      }
      return config;
    };
    this.axiosInstance.interceptors.request.use(addTokenInterceptor);

    // 添加事件戳到 get 请求
    const addJoinTimeInterceptor = (config: InternalAxiosRequestConfig) => {
      if (config.method?.toUpperCase() == HttpRequestMethodsEnum.GET) {
        const options = this.getOptions(config);
        if (options.joinTime === true) {
          config.params = {
            _t: `${Date.now()}`,
            ...config.params,
          };
        }
      }

      return config;
    };

    this.axiosInstance.interceptors.request.use(addJoinTimeInterceptor);

    const handleBaseResponse = (axiosResponse: AxiosResponse) => {
      // 删除重复请求
      axiosResponse && this.requestDeduplicator.removePending(axiosResponse.config);
      return axiosResponse;
    };

    this.axiosInstance.interceptors.response.use(handleBaseResponse, (error: AxiosError) => {
      const { response, code } = error;
      // 处理错误
      let errMessage = '';
      // 如果 response?.status 则根据状态码翻译错误信息
      if (response?.status)
        errMessage = this.getErrorMessageByStatus(response.status);
      else
      // 否则根据 axios 的错误代码进行翻译（标准的Node.js和网络错误代码）
      // 参考 https://github.com/axios/axios/blob/v1.x/lib/core/AxiosError.js#L58
        errMessage = this.getErrorMessageByCode(code);
      error.message = errMessage; // 覆盖 AxiosError 错误信息
      return Promise.reject(error);
    });
  }

  private transformResponse<T = any>(response: AxiosResponse<Result<T>>) {
    // 处理服务器返回的数据
    const { config, data } = response;
    const options = this.getOptions(config);
    // 是否返回原生数据 包含 headers status 等信息
    if (options.isReturnNativeResponse) {
      return response;
    }
    else {
      // 根据 服务器自定义状态码返回
      // 如果 code!=200 返回自定义错误
      if (data.code != 200)
        throw new HttpRequestError(data.msg, data.code); // 在同步代码中抛出错误
      else
        return data;
    }
  }

  // 检查 token 是否过期
  static isTokenExpired(e: Error | AxiosError | HttpRequestError) {
    return isHttpRequestError(e) && e.status === 401;
  }

  // 文件上传
  uploadFile<T = any>(config: AxiosRequestConfig, params: Record<string, any>) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename)
      formData.append(customFilename, params.file, params.filename);
    else
      formData.append(customFilename, params.file);

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': HttpRequestHeadersContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }

  // 格式化 formdata
  formatFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== HttpRequestHeadersContentTypeEnum.FORM_URLENCODED
      || config.data && typeof config.data == 'object' && Object.keys(config.data.length)
      || config.method?.toUpperCase() === HttpRequestMethodsEnum.GET
    )
      return config;

    return {
      ...config,
      data: Qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  // 如果 返回 原生响应 则 => Promise<AxiosResponse<Result<T>>>
  // 否则 => Promise<Result<T>>
  get<T = any>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<Result<T>>>;
  get<T = any>(config: HttpRequestOption): Promise<Result<T>>;
  get<T = any>(config: HttpRequestOption): Promise<Result<T> | AxiosResponse<Result<T>>> {
    return this.request({ ...config, method: 'GET' });
  }

  post<T = any>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<Result<T>>>;
  post<T = any>(config: HttpRequestOption): Promise<Result<T>>;
  post<T = any>(config: HttpRequestOption): Promise<Result<T> | AxiosResponse<Result<T>>> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T = any>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<Result<T>>>;
  put<T = any>(config: HttpRequestOption): Promise<Result<T>>;
  put<T = any>(config: HttpRequestOption): Promise<Result<T> | AxiosResponse<Result<T>>> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T = any>(config: isReturnNativeResponseHttpRequestOption): Promise<AxiosResponse<Result<T>>>;
  delete<T = any>(config: HttpRequestOption): Promise<Result<T>>;
  delete<T = any>(config: HttpRequestOption): Promise<Result<T> | AxiosResponse<Result<T>>> {
    return this.request({ ...config, method: 'DELETE' });
  }

  request<T = any>(config: HttpRequestOption): Promise<Result<T> | AxiosResponse<Result<T>>> {
    config = this.formatFormData(config);
    return this.axiosInstance.request(config)
      .then((res) => {
        return this.transformResponse(res);
      }).catch((e: Error | AxiosError | HttpRequestError) => {
        // 所有错误的最终处理

        // 重复请求不报错
        if (isAxiosError(e) && e.code == 'ERR_CANCELED') {
          console.warn('请求已经被取消');
        }
        else {
          // 是否登录过期
          if (HttpRequest.isTokenExpired(e))
            this.requestCallbacks?.onTokenExpired?.();
          else
            this.requestCallbacks.onError?.(e.message);
        }
        throw e; // 注意这里，我们直接抛出错误，不需要调用 reject
      });
  }
}

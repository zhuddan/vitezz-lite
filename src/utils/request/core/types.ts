import type { AxiosRequestConfig } from 'axios';

export interface HttpRequestOption extends AxiosRequestConfig {
  /**
   * @description 是否需要token
   */
  withToken?: boolean;
  /**
   * @description headers 携带token的key
   */
  tokenKey?: string;
  /**
   * @description 返回原生响应 AxiosResponse<T> 默认false
   */
  isReturnNativeResponse?: boolean;
  /**
   * @description get 请求的是否加上时间戳 默认false
   */
  joinTime?: boolean;
  /**
   * @description 是否 忽略重复请求 默认true（即相同的请求在第一个请求完成之前，其他请求都会被取消）
   *              结合 RequestDeduplicator 实现
   *              参考 axios 取消请求 https://axios-http.com/zh/docs/cancellation
   */
  ignoreRepeatRequest?: boolean;
  /**
   * @description token 的前缀 例如 authenticationScheme = Authorization token = 123 则 config.headers[tokenKey] = "Authorization 123"
   */
  authenticationScheme?: string;
}

export type HttpRequestOptionWithoutMethod = Omit<HttpRequestOption, 'method'>;
/**
 * @description 返回原生响应的 参数 为了请求方法重载做准备
 *              如果 isReturnNativeResponse 默认是 true 请自行修改 transformResponse 和函数重载
 */
export type isReturnNativeResponseHttpRequestOption = HttpRequestOptionWithoutMethod & { isReturnNativeResponse: true };

/**
 * @description HttpRequest 的处理方法
 */
export interface HttpHandlers {
  /**
   * @description  获取token  结合 withToken 和 tokenKey 在 config.headers 设置 token
   */
  getToken?(): string | null;
  /**
   * @description  token 过期时的操作
   */
  onTokenExpired?(): void | any;
  /**
   * @description 错误发生时候的处理？例如是否是弹框提醒
   * @param msg
   */
  onError?(msg: string): void;
}

/**
 * @description 请求方法
 */
export enum HttpRequestMethodsEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description headers ContentType
 */
export enum HttpRequestHeadersContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}


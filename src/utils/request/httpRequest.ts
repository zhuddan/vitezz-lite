import { getToken } from '../cache';
import Qs from 'qs';
import { HttpRequest, HttpRequestHeadersContentTypeEnum } from './core';
import { useUserStore } from '@/store/modules/user';
import { router } from '@/router';
import { showErrorMessage } from '../ui';
import { isObject } from '../is';

function transformRequest(params?: object) {
  if (!isObject(params)) return '';
  let result = '';
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    const part = `${encodeURIComponent(propName)}=`;
    if (value !== null && typeof value !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && typeof value[key] !== 'undefined') {
            const params = `${propName}[${key}]`;
            const subPart = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      }
      else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
}

export const httpRequest = new HttpRequest({
  // AxiosRequestConfig
  baseURL: __APP_API_URL__,
  timeout: 2000,
  headers: {
    'Content-Type': HttpRequestHeadersContentTypeEnum.JSON,
  },
  paramsSerializer(params) {
    return Qs.stringify(params, { arrayFormat: 'brackets' });
  },
  transformRequest: [
    (params) => {
      return transformRequest(params);
    },
  ],
  // HttpRequestOption
  withToken: true,
  joinTime: true,
  ignoreRepeatRequest: true,
  tokenKey: 'Authorization',
  authenticationScheme: 'Bearer',
}, {
  onError: showErrorMessage,
  getToken: () => getToken(),
  onTokenExpired: () => {
    const uerStore = useUserStore();
    uerStore.logout().then(() => {
      router.replace('/');
    });
  },
});

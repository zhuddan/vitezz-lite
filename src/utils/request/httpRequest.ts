import { router } from '@/router';
import { useUserStore } from '@/store/modules/user';

import { HttpRequest, HttpRequestHeadersContentTypeEnum } from './core';

import { getToken } from '../cache';
import { showErrorMessage } from '../ui';
import Qs from 'qs';

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

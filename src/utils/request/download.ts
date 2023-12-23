import type { HttpRequestOption } from './core';

import { HttpRequestError } from './core';

import { httpRequest } from '.';

import { isObject } from '../is';
import { saveAs } from 'file-saver';

interface DownloadOptions extends HttpRequestOption {
  filename?: string;
}

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

export function download(config: DownloadOptions) {
  function getHeaderFileName(headers: Record<string, any>) {
    const headersFileNameKey = [
      'file-name',
      'download-filename',
      'File-Name',
      'FileName',
      'Filename',
    ];
    headersFileNameKey.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        if (headers[key])
          return `${headers[key]}`;
      }
    });
    return '';
  }
  return httpRequest
    .request({
      ...config,
      transformRequest: [
        (params) => {
          return transformRequest(params);
        },
      ],
      responseType: 'blob',
      isReturnNativeResponse: true,
    })
    .then(async (res) => {
      const data = res.data;
      const isBlob = res.data instanceof Blob;
      if (isBlob) {
        if (res.data?.type && !config.filename) {
          saveAs(res.data);
        }
        else {
          const urlList = config.url?.split('/');
          const extList = config.url?.split('.');
          const urlFileName = urlList && urlList?.length >= 0 ? urlList[urlList?.length - 1] : '';
          const ext = extList && extList?.length >= 0 ? extList[extList?.length - 1] : '';
          const filename = config.filename || getHeaderFileName(config.headers || {}) || urlFileName || `${Date.now()}.${ext}`;
          saveAs(res.data, decodeURI(decodeURI(filename)));
        }
      }
      else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const e = new HttpRequestError(rspObj.msg, rspObj.code || 500); // 在同步代码中抛出错误
        throw e;
      }
    }).catch((e) => {
      httpRequest.requestCallbacks?.onError?.(e.message);
    });
}
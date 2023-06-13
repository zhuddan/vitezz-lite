import type { HttpRequestOption } from './core';

import { HttpRequestError } from './core';
import { saveAs } from 'file-saver';
import { httpRequest } from './httpRequest';
import { reject } from 'lodash-es';

interface DownloadOptions extends HttpRequestOption {
  filename?: string;
}

async function blobValidate(data: any) {
  try {
    const text = await data.text();
    JSON.parse(text);
    return false;
  }
  catch (error) {
    return true;
  }
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
  return httpRequest.request({
    ...config,
    responseType: 'blob',
    isReturnNativeResponse: true,
  }).then(async (res) => {
    const data = res.data;
    const isBlob = await blobValidate(data);
    if (isBlob) {
      const urlList = config.url?.split('/');
      const extList = config.url?.split('.');
      const urlFileName = urlList && urlList?.length >= 0 ? urlList[urlList?.length - 1] : '';
      const ext = extList && extList?.length >= 0 ? extList[extList?.length - 1] : '';
      const filename = config.filename || getHeaderFileName(config.headers || {}) || urlFileName || `${Date.now()}.${ext}`;
      const blob = new Blob([data]);
      saveAs(blob, decodeURI(decodeURI(filename)));
    }
    else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const e = new HttpRequestError(rspObj.msg, rspObj.code || 500); // 在同步代码中抛出错误
      reject(e);
    }
  });
}
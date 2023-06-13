import type { AxiosRequestConfig, Canceler } from 'axios';

import axios from 'axios';

export class HttpRequestDeduplicator {
  pendingMap = new Map<string, Canceler>();
  static generateUniqueIdentifier(config: AxiosRequestConfig) {
    return [config.method, config.url].join('&');
  }

  addPending(config: AxiosRequestConfig) {
    // 如果之前有这个请求了就取消掉
    this.removePending(config);
    const url = HttpRequestDeduplicator.generateUniqueIdentifier(config);
    config.cancelToken
      = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) {
          // If there is no current request in pending, add it
          this.pendingMap.set(url, cancel);
        }
      });
  }

  removeAllPending() {
    this.pendingMap.forEach((cancel) => {
      // 取消请求
      cancel && typeof cancel == 'function' && cancel();
    });
    this.pendingMap.clear();
  }

  removePending(config: AxiosRequestConfig) {
    const url = HttpRequestDeduplicator.generateUniqueIdentifier(config);

    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      // 取消请求
      cancel && cancel(url);
      this.pendingMap.delete(url);
    }
  }

  reset(): void {
    this.pendingMap = new Map<string, Canceler>();
  }
}

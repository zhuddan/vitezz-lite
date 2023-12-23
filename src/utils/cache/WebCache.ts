import { isNumber, isObject } from '../is';
import { parseJson, stringifyJson } from '../json';

export interface WebCacheTimeObject {
  day?: number;
  hour?: number;
  minutes?: number;
  second?: number;
}

export interface WebCacheData<T = any> {
  value: T;
  expires: number;
}

export type WabCacheExpiresTime = WebCacheTimeObject | number;

export class WebCache<CacheType extends object> {
  projectName: string;
  projectVersion: string;
  defaultExpires: WabCacheExpiresTime = 864e5 * 7; // Default to 7 days

  constructor({ projectName, projectVersion, time }: { projectName: string; projectVersion: string; time?: WabCacheExpiresTime }) {
    this.projectName = projectName;
    this.projectVersion = projectVersion;
    if (time) {
      const t = isObject(time) && !Array.isArray(time) && time !== null ? this.formatExpires(time) : time;
      this.defaultExpires = t;
    }
  }

  get perfixKey() {
    return `${this.projectName}_${this.projectVersion}_`;
  }

  getRealKey<K extends keyof CacheType>(key: K) {
    return `${this.perfixKey}${String(key)}`;
  }

  formatExpires(data: Partial<WebCacheTimeObject> | number): number {
    if (isNumber(data)) return data;
    const { day, hour, minutes, second } = data;
    const dataDay = (day ? day * 24 : 0) * 864e2;// 秒
    const dataHours = (hour || 0) * 60 * 60;// 秒
    const dataMinutes = (minutes || 0) * 60;// 秒
    const dataSeconds = (second || 0) * 60;// 秒
    return (dataDay + dataHours + dataMinutes + dataSeconds) * 1000;
  }

  getExpires(expiresTime?: Partial<WebCacheTimeObject> | number): number {
    let expires = this.formatExpires(this.defaultExpires);
    // 如果 expiresTime == -1 永远不删除
    if (typeof expiresTime === 'number') {
      if (expiresTime == -1)
        expires = Number.MAX_SAFE_INTEGER;
    }

    else if (expiresTime && isObject(expiresTime)) {
      expires = this.formatExpires(expiresTime);
    }

    return Date.now() + expires;
  }

  set<K extends keyof CacheType>(key: K, value: CacheType[K], options: WabCacheExpiresTime = this.defaultExpires) {
    if (typeof localStorage === 'undefined') return;
    const _key = this.getRealKey(key);
    const data = stringifyJson({
      value,
      expires: this.getExpires(options),
    });
    try {
      data && localStorage.setItem(_key, data);
    }
    catch (e) {
      // handle exceptions, possibly by removing older items
    }
  }

  get<K extends keyof CacheType>(key: K) {
    if (typeof localStorage === 'undefined') return null;
    const _key = this.getRealKey(key);
    const res = localStorage.getItem(_key);
    if (!res) return null;
    const result = parseJson<WebCacheData<CacheType[K]>>(res);
    if (!result) return null;
    const { expires, value } = result;
    const now = Date.now();
    if (expires < now) {
      this.remove(key);
      return null;
    }
    return value;
  }

  remove<K extends keyof CacheType>(key: K) {
    if (typeof localStorage === 'undefined') return;
    const _key = this.getRealKey(key);
    localStorage.removeItem(_key);
  }

  clear() {
    if (typeof localStorage === 'undefined') return;
    const keysToDelete = [];
    for (let i = 0, len = localStorage.length; i < len; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.perfixKey))
        keysToDelete.push(key);
    }
    keysToDelete.forEach(key => localStorage.removeItem(key));
  }
}

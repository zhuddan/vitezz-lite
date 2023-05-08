import { webCache } from './cache';

export function setToken(value: string) {
  webCache.set('TOKEN', value, { day: 7 });
}

export function getToken() {
  return webCache.get('TOKEN');
}

export function removeToken() {
  webCache.remove('TOKEN');
}

export function setAppCollapse(value: boolean) {
  webCache.set('APP_COLLAPSE', value, -1);
}

export function getAppCollapse(): boolean {
  const result = webCache.get('APP_COLLAPSE');
  return typeof result == 'boolean' ? result : true;
}

export function removeAppCollapse() {
  webCache.remove('APP_COLLAPSE');
}

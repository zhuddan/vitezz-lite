import { isLink } from '@/utils/is';
import { kebabCase } from 'lodash-es';

export function resolvePath(...paths: string[]): string {
  let resolvedPath = '';
  const hrefItem = paths.find(path => isLink(path));
  if (hrefItem)
    return hrefItem;

  const lastAbsolutePath = paths.findLastIndex(p => p.startsWith('/'));
  if (lastAbsolutePath)
    paths = paths.splice(lastAbsolutePath);

  for (const path of paths)
    resolvedPath = resolvedPath ? `${resolvedPath}/${path}` : path;

  const isAbsolute = resolvedPath.startsWith('/');
  const parts = resolvedPath.split('/').filter(part => part !== '.');

  const resolvedParts: string[] = [];

  for (const part of parts) {
    if (part === '..') {
      if (resolvedParts.length > 0 && resolvedParts[resolvedParts.length - 1] !== '..')
        resolvedParts.pop();

      else if (!isAbsolute)
        resolvedParts.push(part);
    }
    else {
      resolvedParts.push(part);
    }
  }

  resolvedPath = resolvedParts.join('/');

  if (isAbsolute && !resolvedPath.startsWith('/'))
    resolvedPath = `/${resolvedPath}`;

  resolvedPath = resolvedPath.replace(/\/+/g, '/');

  return resolvedPath;
}

export function mapThemeVarsToCSSVars(varPre: string, themeVars: Record<string, string | number>) {
  const cssVars: Record<string, string | number> = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--${varPre}-${kebabCase(key)}`] = themeVars[key];
  });
  return cssVars;
}

export function createUuid() {
  const temp_url = URL.createObjectURL(new Blob());
  const uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url); // 释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1);
}

const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
const UA = window.navigator.userAgent.toLowerCase() as string;

export const IsPC = Agents.every(e => UA.indexOf(e) < 0);
export const isIE = UA && /msie|trident/.test(UA);
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = (UA && UA.indexOf('android') > 0);
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA));
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
export const isPhantomJS = UA && /phantomjs/.test(UA);
export const isFF = UA && UA.match(/firefox\/(\d+)/);
export const isSafari = /Safari/.test(UA) && !/Chrome/.test(UA);

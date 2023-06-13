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
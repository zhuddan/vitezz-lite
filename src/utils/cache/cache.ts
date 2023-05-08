import { WebCache } from '@zdzz/shared';
import { name as projectName, version as projectVersion } from '../../../package.json';

interface WebCacheKey {
  TOKEN: string;
  APP_COLLAPSE: boolean;
}

export const webCache = new WebCache<WebCacheKey>({
  projectName,
  projectVersion,
});

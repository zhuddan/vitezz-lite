import { HttpRequestError } from './HttpRequestError';

// 检查是否是http错误
export function isHttpRequestError(e: any): e is HttpRequestError {
  return e instanceof HttpRequestError;
}
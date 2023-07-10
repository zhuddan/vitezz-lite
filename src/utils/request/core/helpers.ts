import { HttpRequestError } from './HttpRequestError';

export function isHttpRequestError(e: any): e is HttpRequestError {
  return e instanceof HttpRequestError;
}
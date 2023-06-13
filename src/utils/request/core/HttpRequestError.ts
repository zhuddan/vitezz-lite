/**
 * @description 服务器返回的自定义错误，包含服务器自定义错误码，而不是原生的状态码
 */
export class HttpRequestError extends Error {
  status: number;

  constructor(message?: string, status?: number) {
    super(message);
    this.name = 'HttpRequestError';

    // Ensures that the instanceof check returns true for the extended class.
    Object.setPrototypeOf(this, HttpRequestError.prototype);

    // Add a 'status' property.
    this.status = status || 500;
  }

  static isHttpRequestError(e: any): e is HttpRequestError {
    return e instanceof HttpRequestError;
  }
}

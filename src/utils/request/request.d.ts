declare type ResponseResult<T> = T & {
  code: number;
  msg?: string;
};

declare type ResponseList<T> = ResponseResult<{
  total: number;
  rows: T[];
}>;

declare type ResponseData<T = any> = ResponseResult<{
  data: T;
}>;

interface ResponseListParams {
  pageNum: number;
  pageSize: number;
}

declare type ResponseListParamsWrapper<T extends Recordable = Recordable> = ResponseListParams & Partial<T>;

declare type ResponseListParamsWrapperPartial<T extends Recordable = Recordable> = Partial<ResponseListParams & T>;

declare type ListQuery<T extends Recordable = Recordable> = ResponseListParams
| ResponseListParamsWrapper<T>
| ResponseListParamsWrapper<T>
| Partial<T>;
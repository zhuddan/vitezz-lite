/**
 * @description 基础数据类型
 */
declare type Result<T = any> = {
  code: number;
  msg: string;
} & T;

/**
 * @description 列表数据 ruoyi 返回的是 rows 和 total 如果是其他格式请自定义
 *              注意！ rows 已经 是个 T[] 类型！
 */
declare type ResponseList<T> = Result<{
  total: number;
  rows: T[];
}>;

/**
 * @description 数据类型 包含在 data 里面
 */
declare type ResponseData<T = any> = Result<{
  data: T;
}>;

/**
 * @description 基础分页参数 pageNum pageSize
 */
declare interface ListParamsBase {
  pageNum: number;
  pageSize: number;
}
/**
 * @description 基础分页参数查询
 */
declare type ListParamsWrapper<T extends Recordable = Recordable> = ListParamsBase & Partial<T>;

declare type ResponseListParamsWrapperPartial<T extends Recordable = Recordable> = Partial<ListParamsBase & T>;

declare type ListQuery<T extends Recordable = Recordable> = ListParamsBase
| ListParamsWrapper<T>
| ListParamsWrapper<T>
| Partial<T>;
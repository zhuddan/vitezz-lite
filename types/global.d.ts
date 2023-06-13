declare global {
  // common
  interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  type TreeItem<T> = T & {
    children?: TreeItem<T>[];
  };

  type TreeList<T> = TreeItem<T>[];

  type Nullable<T> = T | null;

  type Arrayable<T> = T | T[];

  type Awaitable<T> = Promise<T> | T;

  type Functionable<T> = () => T | T;

  // vue

  type EmitType = (event: string, ...args: any[]) => void;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
  // 解决类型嵌套过深的问题
  // type MaybeRef<T> = T | Ref<T>;
  type MaybeRef<T> = Ref<UnwrapRef<T>> | T;

  type MaybeComputedRef<T> = MaybeReadonlyRef<T> | MaybeRef<T>;

  type MaybeReadonlyRef<T> = (() => T) | ComputedRef<T>;
  // window

  function setInterval(
    handler: (...args: any[]) => void,
    timeout: number
  ): number;

  type TargetContext = '_self' | '_blank';

  interface VEvent extends Event {
    target: HTMLInputElement;
  }

  type IntervalHandle = ReturnType<typeof setInterval>;

  type TimeoutHandle = ReturnType<typeof setTimeout>;

  interface AnyObject {
    [key: string]: any;
  }
}

export {};

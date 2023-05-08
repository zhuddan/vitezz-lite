declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Icon: typeof import('@/components/Icon')['Icon'];
  }
}
export {};
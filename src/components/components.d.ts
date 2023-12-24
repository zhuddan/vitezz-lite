declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SvgIcon: typeof import('@/components/SvgIcon/SvgIcon.vue')['default'];
  }
}
export {};
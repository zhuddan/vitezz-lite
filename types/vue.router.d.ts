import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    auth?: boolean;
    hidden?: boolean;
    active?: string;
  }
}

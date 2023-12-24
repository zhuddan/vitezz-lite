import type { RouteRecordRaw } from 'vue-router';

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    meta: {
      title: '首页',
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/about',
    meta: {
      title: 'about',
    },
    component: () => import('@/views/about/index.vue'),
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      layout: false,
    },
    component: () => import('@/views/sign/login.vue'),
  },
  {
    path: '/dict',
    meta: {
      title: 'dict',
    },
    component: () => import('@/views/dict/index.vue'),
  },
  {
    path: '/redirect/:path(.*)',
    meta: {
      title: 'redirect',
    },
    component: () => import('@/views/redirect.vue'),
  },
  {
    path: '/:path(.*)',
    meta: {
      title: '404 not-find',
    },
    component: () => import('@/views/error/404.vue'),
  },
];

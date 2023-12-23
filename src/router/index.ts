import type { App } from 'vue';

import { baseRoutes } from './routes/baseRoutes';

import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;

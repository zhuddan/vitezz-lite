import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './routes/baseRoutes';

export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
});

export function setupRouter(app: App) {
  app.use(router);
}

export default router;

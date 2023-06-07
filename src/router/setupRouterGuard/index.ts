import type { Router } from 'vue-router';

import { createHttpGuard } from './createHttpGuard';
import { createPermissionGuard } from './createPermissionGuard';
import { createProgressGuard } from './createProgressGuard';

export function setupRouterGuard(router: Router) {
  createPermissionGuard(router);
  createHttpGuard(router);
  createProgressGuard(router);
}
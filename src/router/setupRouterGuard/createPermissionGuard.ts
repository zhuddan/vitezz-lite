import type { Router } from 'vue-router';

import { useUserStore } from '@/store/modules/user';
import { getToken } from '@/utils/cache';

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    if (getToken()) {
      if (!userStore.user) {
        await userStore.getInfo();
      }
    }
    next();
  });
}
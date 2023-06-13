import type { Router } from 'vue-router';

import { httpRequest } from '@/utils/request';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: true };

  router.beforeEach(async () => {
    if (removeAllHttpPending)
      httpRequest.requestDeduplicator.removeAllPending();

    return true;
  });
}
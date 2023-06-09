import type { Router } from 'vue-router';

import { axiosCanceler } from '@/utils/http';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: true };
  // let axiosCanceler: Nullable<AxiosCanceler>;

  router.beforeEach(async () => {
    if (removeAllHttpPending)
      axiosCanceler?.removeAllPending();

    return true;
  });
}
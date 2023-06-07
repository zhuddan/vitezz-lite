import type { Router } from 'vue-router';

import { AxiosCanceler } from '@zdzz/shared';

export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = { removeAllHttpPending: true };
  let axiosCanceler: Nullable<AxiosCanceler>;

  if (removeAllHttpPending)
    axiosCanceler = new AxiosCanceler();

  router.beforeEach(async () => {
    axiosCanceler?.removeAllPending();
    return true;
  });
}
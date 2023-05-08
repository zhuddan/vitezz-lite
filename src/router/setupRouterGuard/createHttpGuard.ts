import { AxiosCanceler } from '@zdzz/shared';
import type { Router } from 'vue-router';

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
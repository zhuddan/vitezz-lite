import { useUserStore } from './modules/user';

export function initStore() {
  const user = useUserStore();
  user;
  console.log(`> init_store: ${Date.now()}`);
}

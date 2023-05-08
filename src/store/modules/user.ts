import { defineStore } from 'pinia';

import { getInfo, login } from '@/api/login';
import { removeToken, setToken } from '@/utils/cache';

import type { UserState } from '../typings/user';

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    user: null,
    roles: [],
    permissions: [],
  }),
  actions: {
    async login(username: string, password: string, code: string, uuid: string) {
      const res = await login(username, password, code, uuid);
      setToken(res.token);
    },
    logout(): Promise<void> {
      return new Promise((resolve) => {
        this.resetAllState();
        resolve();
      });
    },
    async getInfo() {
      const res = await getInfo();
      this.user = res.user;
      this.roles = res.roles;
      this.permissions = res.permissions;
    },
    resetAllState() {
      this.$reset();
      removeToken();
    },
  },
});

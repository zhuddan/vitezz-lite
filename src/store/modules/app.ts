import { defineStore } from 'pinia';

import type { AppState } from '../typings/app';

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
  }),
  actions: {

  },
  getters: {
  },
});

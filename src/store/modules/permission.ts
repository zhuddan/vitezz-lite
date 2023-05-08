import { defineStore } from 'pinia';
import type { PermissionState } from '../typings/permission';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
  }),
  actions: {

  },
});

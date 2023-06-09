import type { UserInfo } from '@/api/model/userModel';

export interface UserState {
  user: UserInfo | null;
  roles: string[];
  permissions: string[];
}

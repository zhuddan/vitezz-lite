import type { UserInfo } from '@/api/model/userModel';

export interface UserState {
  user: Nullable<UserInfo>;
  roles: string[];
  permissions: string[];
}

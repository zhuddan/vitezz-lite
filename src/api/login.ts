import { defHttp } from '@/utils/http';

import type { UserModel } from './model/userModel';
// 获取验证码
export function getCodeImg() {
  return defHttp.get<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/captchaImage',
    },
    {
      withToken: false,
    },
  );
}

// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
  return defHttp.post<ResponseResult<{ token: string }>>(
    {
      url: '/login',
      data: {
        username,
        password,
        code,
        uuid,
      },
    },
    {
      withToken: false,
    },
  );
}

// 获取用户详细信息
export function getInfo() {
  return defHttp.get<ResponseResult<UserModel>>({
    url: '/getInfo',
  });
}

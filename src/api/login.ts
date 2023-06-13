import type { UserModel } from './model/userModel';

import { httpRequest } from '@/utils/request';

// 获取验证码
export function getCodeImg() {
  return httpRequest.get<ResponseResult<{ img: string; uuid: string }>>(
    {
      url: '/captchaImage',
      withToken: false,
    },
  );
}

// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
  return httpRequest.post<ResponseResult<{ token: string }>>(
    {
      url: '/login',
      data: {
        username,
        password,
        code,
        uuid,
      },
      withToken: false,
    },
  );
}

// 获取用户详细信息
export function getInfo() {
  return httpRequest.get<ResponseResult<UserModel>>({
    url: '/getInfo',
  });
}

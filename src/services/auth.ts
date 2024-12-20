import myAxios from '@/lib/myAxios';
import type { PromiseType, Role } from '@/typings';

/**
 * 认证服务
 *
 * @param username 用户名称
 * @param password 认证密码
 * @author Jia-Yao Zhao
 */
export const authenticationService = (
  username: string | null,
  password: string | null,
): PromiseType<{
  token: string;
  id: number;
  username: string;
  nickname: string | null;
  role: Role;
}> => {
  return myAxios.post('/authentication', { username, password });
};

/**
 * 授权服务
 *
 * @author Jia-Yao Zhao
 */
export const authorizationService = async (): PromiseType<{
  id: number;
  username: string;
  nickname: string | null;
  role: Role;
}> => {
  return await myAxios.post('/authorization');
};

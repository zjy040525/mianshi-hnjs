import myAxios from '../lib/myAxios';
import type { Permission, Response } from '../typings';

/**
 * 认证服务
 *
 * @param username 用户名称
 * @param password 认证密码
 * @author Jia-Yao Zhao
 */
export const authenticationService = (
  username: string | null,
  password: string | null
): Promise<
  Response<{
    token: string;
    id: number;
    username: string;
    nickname: string | null;
    permission: Permission;
  }>
> => {
  return myAxios.post('/authentication', { username, password });
};

/**
 * 授权服务
 *
 * @author Jia-Yao Zhao
 */
export const authorizationService = async (): Promise<
  Response<{
    id: number;
    username: string;
    nickname: string | null;
    permission: Permission;
  }>
> => {
  return await myAxios.post('/authorization');
};

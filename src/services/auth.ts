import myAxios from '../lib/myAxios';
import type { Permission } from '../types/permission';
import type { Response } from '../types/response';

/**
 * 身份认证服务
 *
 * @param username 用户名称
 * @param password 认证密码
 * @author Jia-Yao Zhao
 */
export const authService = (
  username: string | null,
  password: string | null
): Promise<Response<{ token: string; permission: Permission }>> => {
  return myAxios.post('/auth', { username, password });
};

/**
 * 身份有效性验证服务
 *
 * @author Jia-Yao Zhao
 */
export const authValidationService = async (): Promise<
  Response<{ permission: Permission }>
> => {
  return await myAxios.post('/auth/validation');
};

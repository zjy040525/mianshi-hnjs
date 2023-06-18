import myAxios from '../lib/myAxios';
import { ResponseModelType } from '../types/response';

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
): Promise<ResponseModelType<{ token: string; permission: number }>> => {
  return myAxios.post('/auth', { username, password });
};

/**
 * 身份有效性验证服务
 *
 * @author Jia-Yao Zhao
 */
export const authValidationService = async (): Promise<
  ResponseModelType<{ permission: string }>
> => {
  return await myAxios.post('/auth/validation');
};

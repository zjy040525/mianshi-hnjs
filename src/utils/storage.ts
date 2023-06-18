import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constant/storage';

/**
 * 设置身份认证token
 *
 * @param token
 * @author Jia-Yao Zhao
 */
export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, token);
};

/**
 * 删除身份认证token
 */
export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
};

/**
 * 获取身份认证token
 */
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
};

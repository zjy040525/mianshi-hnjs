import { AUTHORIZATION_TOKEN_LOCAL_STORAGE_KEY } from '../constant/storage';

/**
 * 设置授权token
 *
 * @param token
 * @author Jia-Yao Zhao
 */
export const setAuthorizationToken = (token?: string | null) => {
  if (token) {
    localStorage.setItem(AUTHORIZATION_TOKEN_LOCAL_STORAGE_KEY, token);
  } else {
    removeAuthorizationToken();
  }
};

/**
 * 移除授权token
 */
export const removeAuthorizationToken = () => {
  localStorage.removeItem(AUTHORIZATION_TOKEN_LOCAL_STORAGE_KEY);
};

/**
 * 获取授权token
 */
export const getAuthorizationToken = () => {
  return localStorage.getItem(AUTHORIZATION_TOKEN_LOCAL_STORAGE_KEY);
};

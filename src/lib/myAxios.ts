import axios from 'axios';
import { getAuthorizationToken } from '../utils';

// 基础配置
const myAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 拦截器
myAxios.interceptors.request.use(config => {
  // 发送请求时携带认证用户的凭证
  const token = getAuthorizationToken();
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
  }
  return config;
});
myAxios.interceptors.response.use(
  response => {
    return Promise.resolve(response.data);
  },
  error => {
    // 使用从服务器返回的错误消息，如果服务器没有响应则返回指定的错误（无法连接服务器）
    return Promise.reject({
      code: error?.response?.data?.code || 500,
      message: error?.response?.data?.message || '无法连接到服务器！',
    });
  }
);

export default myAxios;

/**
 * 操作员的操作信息套接字
 *
 * @author Jia-Yao Zhao
 */
export const operationSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/operation';
};

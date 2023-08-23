/**
 * 用户操作的即时信息
 *
 * @author Jia-Yao Zhao
 */
export const userSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/user';
};

/**
 * 统计信息
 *
 * @author Jia-Yao Zhao
 */
export const studentSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/student';
};

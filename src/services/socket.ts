/**
 * 用户操作的即时信息
 *
 * @author Jia-Yao Zhao
 */
export const operationSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/operation';
};

/**
 * 统计信息
 *
 * @author Jia-Yao Zhao
 */
export const statisticSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/statistic';
};

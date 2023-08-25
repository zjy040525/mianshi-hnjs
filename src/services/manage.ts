import myAxios from '@/lib/myAxios';
import type { Response } from '@/typings';

/**
 * 用户的即时信息
 *
 * @author Jia-Yao Zhao
 */
export const userSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/user';
};

/**
 * 学生统计信息
 *
 * @author Jia-Yao Zhao
 */
export const studentSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/student';
};

/**
 * 日志信息
 *
 * @author Jia-Yao Zhao
 */
export const logSocket = () => {
  return import.meta.env.VITE_WS_URL + '/manage/log';
};

/**
 * 删除全部日志
 * @author Jia-Yao Zhao
 */
export const logRemoveAllService = (): Promise<Response<null>> => {
  return myAxios.delete('/manage/log');
};

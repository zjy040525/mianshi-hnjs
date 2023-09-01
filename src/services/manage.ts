import myAxios from '@/lib/myAxios';
import type { InterviewStatus, PromiseType, User } from '@/typings';

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
export const logRemoveAllService = (): PromiseType<null> => {
  return myAxios.delete('/manage/log');
};

/**
 * 获取所有签到管理员的信息
 * @author Jia-Yao Zhao
 */
export const signUserListService = (): PromiseType<User[]> => {
  return myAxios.get('/manage/user/sign');
};

/**
 * 获取所有面试管理员的信息
 * @author Jia-Yao Zhao
 */
export const interviewUserListService = (): PromiseType<User[]> => {
  return myAxios.get('/manage/user/interview');
};

/**
 * 更新学生面试信息
 * @author Jia-Yao Zhao
 */
export const updateStudentService: (data: {
  studentId: number;
  earlyChildhoodEducationInterview: InterviewStatus;
  interviewedDate: string;
  interviewedUserId: number;
  signStatus: boolean;
  signedDate: string;
  signedUserId: number;
  tourismManagementInterview: InterviewStatus;
  urbanRailTransitInterview: InterviewStatus;
}) => PromiseType<null> = (data) => {
  return myAxios.patch('/manage/student/update', data);
};

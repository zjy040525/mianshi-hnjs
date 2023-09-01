import myAxios from '@/lib/myAxios';
import type { InterviewStatus, PromiseType, Student } from '@/typings';

/**
 * 搜索学生服务
 *
 * @param idCard 身份证号码
 * @author Jia-Yao Zhao
 */
export const studentSignSearchService = (
  idCard?: string | null,
): PromiseType<Student[]> => {
  return myAxios.get('/student/sign/search', { params: { idCard } });
};

/**
 * 学生签到服务
 *
 * @param studentId 学生Id
 * @author Jia-Yao Zhao
 */
export const studentSignService = (studentId: number): PromiseType<Student> => {
  return myAxios.patch('/student/sign', { studentId });
};

/**
 * 学生打印服务
 *
 * @param studentId 学生Id
 * @author Jia-Yao Zhao
 */
export const studentPrintService = (studentId: number): Promise<string> => {
  return myAxios.post('/student/print', { studentId });
};

/**
 * 在面试页面搜索已签到的学生服务
 *
 * @param studentId 学生Id
 * @author Jia-Yao Zhao
 */
export const studentInterviewSearchService = (
  studentId: number | string,
): PromiseType<Student[]> => {
  return myAxios.get('/student/interview/search', { params: { studentId } });
};

/**
 * 为学生打分服务
 *
 * @param studentId 学生Id
 * @param earlyChildhoodEducation 学前
 * @param tourismManagement 旅游
 * @param urbanRailTransit 城轨
 * @author Jia-Yao Zhao
 */
export const studentInterviewService = (
  studentId: number | string,
  earlyChildhoodEducation: InterviewStatus,
  tourismManagement: InterviewStatus,
  urbanRailTransit: InterviewStatus,
): PromiseType<Student> => {
  return myAxios.patch('/student/interview', {
    studentId,
    earlyChildhoodEducation,
    tourismManagement,
    urbanRailTransit,
  });
};

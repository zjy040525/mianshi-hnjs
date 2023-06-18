import myAxios from '../lib/myAxios';
import { ResponseModelType } from '../types/response';
import { InterviewStatus, Student } from '../types/student';

/**
 * 搜索学生服务
 *
 * @param idCard 身份证号码
 * @author Jia-Yao Zhao
 */
export const studentSignSearchService = (
  idCard?: string | null
): Promise<ResponseModelType<Student[]>> => {
  return myAxios.get('/student/sign/search', { params: { idCard } });
};

/**
 * 学生签到服务
 *
 * @param studentId 学生Id
 * @author Jia-Yao Zhao
 */
export const studentSignService = (
  studentId: number
): Promise<ResponseModelType<Student>> => {
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
  studentId: number | string
): Promise<ResponseModelType<Student[]>> => {
  return myAxios.get('/student/interview/search', { params: { studentId } });
};

/**
 * 为学生打分服务
 *
 * @param studentId 学生Id
 * @param xq 学前
 * @param ly 旅游
 * @param gd 轨道
 * @author Jia-Yao Zhao
 */
export const studentInterviewService = (
  studentId: number | string,
  xq: InterviewStatus,
  ly: InterviewStatus,
  gd: InterviewStatus
): Promise<ResponseModelType<Student>> => {
  return myAxios.patch('/student/interview', { studentId, xq, ly, gd });
};

/**
 * 学生签到统计信息
 *
 * @author Jia-Yao Zhao
 */
export const studentStatisticService = (): Promise<
  ResponseModelType<{ signedCount: number; noSignedCount: number }>
> => {
  return myAxios.get('/student/statistic');
};

/**
 * 学生总览
 *
 * @author Jia-Yao Zhao
 */
export const studentOverviewService = (): Promise<
  ResponseModelType<Student[]>
> => {
  return myAxios.get('/student/overview');
};

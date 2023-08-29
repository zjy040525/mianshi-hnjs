import type { User } from '.';

export interface Student {
  id: number;
  // 姓名
  name: string;
  // 性别
  gender: string;
  // 身份证号码
  idCard: string;
  // 毕业学校
  graduatedSchool: string;
  // 手机号
  telephoneNumber: string;
  // 中考报名序号
  registrationNumber: string;
  // 签到状态
  signStatus: boolean;
  // 签到时间
  signedDate: string;
  // 执行签到的用户
  signedUserId: null | number;
  signedUser: null | User;
  // 学前专业面试
  earlyChildhoodEducationInterview: InterviewStatus;
  // 旅游专业面试
  tourismManagementInterview: InterviewStatus;
  // 城轨专业面试
  urbanRailTransitInterview: InterviewStatus;
  // 面试时间
  interviewedDate: string;
  // 执行面试的用户
  interviewedUserId: null | number;
  interviewedUser: null | User;
}

export type InterviewStatus = 'Processing' | 'Success' | 'Failed' | null;

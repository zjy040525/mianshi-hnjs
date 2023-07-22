export interface Student {
  id: number;
  // 姓名
  name: string;
  // 性别
  gender: string;
  // 身份证号码
  id_card: string;
  // 毕业学校
  graduated_school: string;
  // 手机号码
  telephone_number: string;
  // 中考报名序号
  registration_number: string;
  // 签到状态
  sign_status: boolean;
  // 签到时间
  signed_date: string | null;
  // 签到操作员
  signed_operator: Operator | null;
  // 学前专业
  interview_xq: InterviewStatus;
  // 旅游专业
  interview_ly: InterviewStatus;
  // 轨道专业
  interview_gd: InterviewStatus;
  // 面试时间
  interviewed_date: string | null;
  // 面试操作员
  interviewed_operator: Operator | null;
}

export type InterviewStatus = 'Processing' | 'Success' | 'Failed' | null;

interface Operator {
  id: number;
  username: string;
  nickname: string | null;
}

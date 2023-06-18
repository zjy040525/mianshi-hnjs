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
  // 学前
  xq: InterviewStatus;
  // 旅游
  ly: InterviewStatus;
  // 轨道
  gd: InterviewStatus;
  // 签到状态
  sign_status: boolean;
  created_at: string;
  updated_at: string;
}

export type InterviewStatus = 'Processing' | 'Success' | 'Failed' | null;

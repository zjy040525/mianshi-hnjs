import type { Student } from '@/typings';
import { Descriptions } from 'antd';
import type { FC, ReactNode } from 'react';
import { InterviewTag } from '..';

export const StudentDescription: FC<{
  student: Student;
  signStatus?: ReactNode;
}> = ({ student, signStatus }) => {
  return (
    <Descriptions
      title="学生信息"
      items={[
        {
          label: '姓名',
          children: student.name,
        },
        {
          label: '性别',
          children: student.gender,
        },
        {
          label: '手机号码',
          children: student.telephoneNumber,
        },
        {
          label: '身份证号码',
          children: student.idCard,
        },
        {
          label: '初中学校',
          children: student.graduatedSchool,
        },
        {
          label: '中考报名序号',
          children: student.registrationNumber,
        },
        {
          label: '面试专业',
          children: (
            <>
              <InterviewTag
                status={student.urbanRailTransitInterview}
                text="城轨"
              />
              <InterviewTag
                status={student.tourismManagementInterview}
                text="旅游"
              />
              <InterviewTag
                status={student.urbanRailTransitInterview}
                text="学前"
              />
            </>
          ),
        },
        {
          label: '签到状态',
          children: signStatus,
        },
      ]}
    />
  );
};

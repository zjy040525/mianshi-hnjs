import type { Student } from '@/typings';
import { Descriptions } from 'antd';
import type { FC, ReactNode } from 'react';
import { InterviewStatusIcon } from './components';

export const StudentDescription: FC<{
  student: Student;
  signStatus?: ReactNode;
}> = ({ student, signStatus }) => {
  return (
    <Descriptions
      title={import.meta.env.VITE_DOCUMENT_NAME}
      bordered
      items={[
        {
          label: '考生姓名',
          children: student.name,
        },
        {
          label: '性别',
          children: student.gender,
        },
        {
          label: '手机号码',
          children: student.telephone_number,
        },
        {
          label: '身份证号码',
          children: student.id_card,
        },
        {
          label: '初中就读学校',
          children: student.graduated_school,
        },
        {
          label: '中考报名序号',
          children: student.registration_number,
        },
        {
          label: '面试学前',
          children: <InterviewStatusIcon cond={student.interview_xq} />,
        },
        {
          label: '面试旅游',
          children: <InterviewStatusIcon cond={student.interview_ly} />,
        },
        {
          label: '面试轨道',
          children: <InterviewStatusIcon cond={student.interview_gd} />,
        },
        {
          label: '签到状态',
          children: signStatus,
        },
      ]}
    />
  );
};

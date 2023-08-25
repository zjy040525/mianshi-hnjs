import type { Student } from '@/typings';
import { Descriptions } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { InterviewTag } from '..';

export const StudentPrintDescription: FC<{
  student: Student;
}> = ({ student }) => {
  return (
    <Descriptions
      title={import.meta.env.VITE_DOCUMENT_NAME}
      items={[
        {
          label: '签到时间',
          children: dayjs(student.signedDate).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
          label: '系统序号',
          children: student.id,
        },
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
      ]}
    />
  );
};

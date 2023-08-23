import type { Student } from '@/typings';
import { Descriptions, Tag } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';

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
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag
                style={{ marginInlineEnd: 0 }}
                color={student.urbanRailTransitInterview ? 'success' : 'error'}
              >
                城轨
              </Tag>
              <Tag
                style={{ marginInlineEnd: 0 }}
                color={student.tourismManagementInterview ? 'success' : 'error'}
              >
                旅游
              </Tag>
              <Tag
                style={{ marginInlineEnd: 0 }}
                color={
                  student.earlyChildhoodEducationInterview ? 'success' : 'error'
                }
              >
                学前
              </Tag>
            </div>
          ),
        },
      ]}
    />
  );
};

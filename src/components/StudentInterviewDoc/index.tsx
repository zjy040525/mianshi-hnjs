import type { Student } from '@/typings';
import { Descriptions } from 'antd';
import { FC } from 'react';
import { DescriptionTitle, DocDescription, interviewItems } from './components';

export const StudentInterviewDoc: FC<{ student: Student }> = ({ student }) => {
  return (
    <>
      <Descriptions
        style={{ marginBlockEnd: 50 }}
        title={<DescriptionTitle student={student} />}
        bordered
        items={[
          {
            label: '考生姓名',
            children: student.name,
          },
          {
            label: '身份证号',
            children: student.id_card,
          },
          {
            label: '性别',
            children: student.gender,
          },
          {
            label: '初中就读学校',
            children: student.graduated_school,
          },
          interviewItems(student),
          {
            label: '面试盖章',
            children: '',
          },
        ]}
      />
      <DocDescription
        student={student}
        cond={!!student.interview_gd}
        title="城市轨道交通运输与管理"
      />
      <DocDescription
        student={student}
        cond={!!student.interview_ly}
        title="旅游服务与管理"
      />
      <DocDescription
        student={student}
        cond={!!student.interview_xq}
        title="幼儿教育"
      />
    </>
  );
};

import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Descriptions, Typography } from 'antd';
import { FC, ReactNode } from 'react';
import type { Student } from '../../types/student';

const IconStatus: FC<{ condition: any }> = ({ condition }) => {
  return condition ? (
    <Typography.Text type="success">
      <CheckCircleFilled />
    </Typography.Text>
  ) : (
    <Typography.Text type="danger">
      <CloseCircleFilled />
    </Typography.Text>
  );
};

const StudentCredential: FC<{
  student: Student;
  signStatus?: ReactNode;
}> = ({ student, signStatus }) => {
  return (
    <Descriptions title="2023年海宁技师学院招生面试单" bordered>
      <Descriptions.Item label="考生姓名">{student.name}</Descriptions.Item>
      <Descriptions.Item label="性别">{student.gender}</Descriptions.Item>
      <Descriptions.Item label="手机号码">
        {student.telephone_number ?? ''}
      </Descriptions.Item>
      <Descriptions.Item label="身份证号码">
        {student.id_card}
      </Descriptions.Item>
      <Descriptions.Item label="初中就读学校">
        {student.graduated_school}
      </Descriptions.Item>
      <Descriptions.Item label="中考报名序号">
        {student.registration_number}
      </Descriptions.Item>
      <Descriptions.Item label="面试学前">
        <IconStatus condition={student.interview_xq} />
      </Descriptions.Item>
      <Descriptions.Item label="面试旅游">
        <IconStatus condition={student.interview_ly} />
      </Descriptions.Item>
      <Descriptions.Item label="面试轨道">
        <IconStatus condition={student.interview_gd} />
      </Descriptions.Item>
      <Descriptions.Item label="签到状态">{signStatus}</Descriptions.Item>
    </Descriptions>
  );
};

export default StudentCredential;

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Descriptions, Typography } from 'antd';
import { FC, ReactNode } from 'react';
import type { Student } from '../../types/student';

const StudentDescriptions: FC<{
  chosenStudent: Student;
  signStatus?: ReactNode;
}> = ({ chosenStudent, signStatus }) => {
  return (
    <Descriptions title="2023年海宁技师学院招生面试单" bordered>
      <Descriptions.Item label="考生姓名">
        {chosenStudent.name}
      </Descriptions.Item>
      <Descriptions.Item label="性别">{chosenStudent.gender}</Descriptions.Item>
      <Descriptions.Item label="手机号码">
        {chosenStudent.telephone_number ?? ''}
      </Descriptions.Item>
      <Descriptions.Item label="身份证号码">
        {chosenStudent.id_card}
      </Descriptions.Item>
      <Descriptions.Item label="初中就读学校">
        {chosenStudent.graduated_school}
      </Descriptions.Item>
      <Descriptions.Item label="中考报名序号">
        {chosenStudent.registration_number}
      </Descriptions.Item>
      <Descriptions.Item label="面试学前">
        {chosenStudent.interview_xq ? (
          <Typography.Text type="success">
            <CheckOutlined />
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">
            <CloseOutlined />
          </Typography.Text>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="面试旅游">
        {chosenStudent.interview_ly ? (
          <Typography.Text type="success">
            <CheckOutlined />
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">
            <CloseOutlined />
          </Typography.Text>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="面试轨道">
        {chosenStudent.interview_gd ? (
          <Typography.Text type="success">
            <CheckOutlined />
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">
            <CloseOutlined />
          </Typography.Text>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="签到状态">{signStatus}</Descriptions.Item>
    </Descriptions>
  );
};

export default StudentDescriptions;

import {
  BorderOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Descriptions, Space, Typography } from 'antd';
import { FC } from 'react';
import type { Student } from '../../types/student';

const GdPrint: FC<{ chosenStudent: Student | null }> = ({ chosenStudent }) => {
  if (chosenStudent?.interview_gd) {
    return (
      <Descriptions
        style={{ marginBlockEnd: 50 }}
        title={
          <Typography.Title style={{ textAlign: 'center', marginBlockEnd: 0 }}>
            城市轨道交通运输与管理
          </Typography.Title>
        }
        bordered
      >
        <Descriptions.Item label="考生姓名">
          {chosenStudent?.name}
        </Descriptions.Item>
        <Descriptions.Item label="性别">
          {chosenStudent?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="身份证号码">
          {chosenStudent?.id_card}
        </Descriptions.Item>
        <Descriptions.Item label="初中就读学校">
          {chosenStudent?.graduated_school}
        </Descriptions.Item>
        <Descriptions.Item label="备注">
          <Space size={16}>
            <Space>
              <BorderOutlined />
              身高
            </Space>
            <Space>
              <BorderOutlined />
              纹身
            </Space>
            <Space>
              <BorderOutlined />
              头发
            </Space>
            <Space>
              <BorderOutlined />
              身体残疾
            </Space>
            <Space>
              <BorderOutlined />
              其他________
            </Space>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item
          label={
            <div style={{ textAlign: 'center' }}>
              <div>面试结果</div>
              <div>
                （通过打
                <CheckOutlined />
                ，不通过打
                <CloseOutlined />）
              </div>
            </div>
          }
        >
          {''}
        </Descriptions.Item>
        <Descriptions.Item label="教师签名">
          <div style={{ paddingInlineEnd: 60 }}></div>
        </Descriptions.Item>
      </Descriptions>
    );
  }
  return null;
};

export default GdPrint;

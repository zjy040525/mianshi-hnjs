import {
  BorderOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Descriptions, Space, Typography } from 'antd';
import { FC } from 'react';
import { Student } from '../../types/student';

const GdPrint: FC<{ chosenStudent: Student | null }> = ({ chosenStudent }) => {
  if (chosenStudent?.gd) {
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
        <Descriptions.Item label="考生姓名" span={1}>
          {chosenStudent?.name}
        </Descriptions.Item>
        <Descriptions.Item label="性别" span={2}>
          {chosenStudent?.gender}
        </Descriptions.Item>
        <Descriptions.Item label="身份证号码" span={3}>
          {chosenStudent?.id_card}
        </Descriptions.Item>
        <Descriptions.Item label="初中就读学校" span={3}>
          {chosenStudent?.graduated_school}
        </Descriptions.Item>
        <Descriptions.Item label="备注" span={3}>
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
          span={1}
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
        <Descriptions.Item span={2} label="教师签名">
          <div style={{ paddingInlineEnd: 60 }}></div>
        </Descriptions.Item>
      </Descriptions>
    );
  }
  return null;
};

export default GdPrint;

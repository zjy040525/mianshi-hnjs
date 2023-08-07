import type { Student } from '@/typings';
import {
  BorderOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Descriptions, Space, Typography } from 'antd';
import type { FC } from 'react';

export const DocDescription: FC<{
  student: Student;
  cond: boolean;
  title: string;
}> = ({ student, cond, title }) => {
  return cond ? (
    <Descriptions
      style={{ marginBlockEnd: 50 }}
      title={
        <Typography.Title style={{ textAlign: 'center', marginBlockEnd: 0 }}>
          {title}
        </Typography.Title>
      }
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
          label: '身份证号码',
          children: student.id_card,
        },
        {
          label: '初中就读学校',
          children: student.graduated_school,
        },
        {
          label: '备注',
          children: (
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
          ),
        },
        {
          label: (
            <div style={{ textAlign: 'center' }}>
              <div>面试结果</div>
              <div>
                （通过打
                <CheckOutlined />
                ，不通过打
                <CloseOutlined />）
              </div>
            </div>
          ),
          children: '',
        },
        {
          label: '教师签名',
          children: '',
        },
      ]}
    />
  ) : null;
};

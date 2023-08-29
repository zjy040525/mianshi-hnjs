import { Badge, Form, Radio, Space, Typography } from 'antd';
import type { FC } from 'react';
import { badge } from '../..';

export const InterviewFormItem: FC<{
  label?: React.ReactNode;
  name?: string | undefined;
}> = ({ label, name }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: true,
          message: `请选择${label}`,
        },
      ]}
    >
      <Radio.Group>
        <Radio value="Processing">
          <Space>
            <Typography.Text>标记为</Typography.Text>
            {badge('Processing')}
          </Space>
        </Radio>
        <Radio value="Success">
          <Space>
            <Typography.Text>标记为</Typography.Text>
            {badge('Success')}
          </Space>
        </Radio>
        <Radio value="Failed">
          <Space>
            <Typography.Text>标记为</Typography.Text>
            {badge('Failed')}
          </Space>
        </Radio>
        <Radio value="SetNull">
          <Space>
            <Typography.Text>标记为</Typography.Text>
            <Badge status="default" text="未报名" />
          </Space>
        </Radio>
      </Radio.Group>
    </Form.Item>
  );
};

import type { InterviewStatus } from '@/typings';
import { StopOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import type { FC } from 'react';

export const InterviewTag: FC<{
  status: InterviewStatus;
  text: string;
  showNull?: boolean;
}> = ({ status, text, showNull }) => {
  switch (status) {
    case 'Processing':
      return <Tag color="processing">{text}</Tag>;
    case 'Success':
      return <Tag color="success">{text}</Tag>;
    case 'Failed':
      return <Tag color="error">{text}</Tag>;
    case null:
      return showNull ? <Tag icon={<StopOutlined />}>{text}</Tag> : null;
  }
};

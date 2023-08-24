import type { InterviewStatus } from '@/typings';
import { Tag } from 'antd';
import type { FC } from 'react';

export const InterviewTag: FC<{
  status: InterviewStatus;
  text: string;
}> = ({ status, text }) => {
  switch (status) {
    case 'Processing':
      return <Tag color="processing">{text}</Tag>;
    case 'Success':
      return <Tag color="success">{text}</Tag>;
    case 'Failed':
      return <Tag color="error">{text}</Tag>;
    default:
      return null;
  }
};

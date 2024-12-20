import type { InterviewStatus } from '@/typings';
import { Badge } from 'antd';
import type { FC } from 'react';

export const InterviewBadge: FC<{ status: InterviewStatus }> = ({ status }) => {
  switch (status) {
    case 'Processing':
      return <Badge status="processing" text="进行中" />;
    case 'Success':
      return <Badge status="success" text="通过" />;
    case 'Failed':
      return <Badge status="error" text="不通过" />;
    default:
      return null;
  }
};

import { Badge } from 'antd';
import { FC } from 'react';
import type { InterviewStatus } from '../../../../typings';

export const InterviewBadge: FC<{ status: InterviewStatus }> = ({ status }) => {
  switch (status) {
    case 'Processing':
      return <Badge status="processing" text="未面试（进行中）" />;
    case 'Success':
      return <Badge status="success" text="通过" />;
    case 'Failed':
      return <Badge status="error" text="不通过" />;
    default:
      return null;
  }
};

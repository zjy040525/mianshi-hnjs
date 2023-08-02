import { InterviewStatus } from '@/typings';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Typography } from 'antd';
import { FC } from 'react';

export const InterviewStatusIcon: FC<{ cond: InterviewStatus }> = ({
  cond,
}) => {
  return cond ? (
    <Typography.Text type="success">
      <CheckCircleFilled />
    </Typography.Text>
  ) : (
    <Typography.Text type="danger">
      <CloseCircleFilled />
    </Typography.Text>
  );
};

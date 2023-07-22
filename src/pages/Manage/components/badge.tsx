import { Badge } from 'antd';
import type { InterviewStatus } from '../../../typings';

/**
 * 是否通过面试的显示微标
 *
 * @param type 通过状态
 * @author Jia-Yao Zhao
 */
export const badge = (type: InterviewStatus) => {
  switch (type) {
    case 'Processing':
      return <Badge status="processing" text="进行中" />;
    case 'Failed':
      return <Badge status="error" text="未通过" />;
    case 'Success':
      return <Badge status="success" text="已通过" />;
  }
  return '-';
};

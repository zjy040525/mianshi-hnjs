import type { Log } from '@/typings';
import type { TimelineItemProps } from 'antd';
import { propsRender } from '.';

export const logsRender: (logs: Log[]) => TimelineItemProps[] = (logs) => {
  return logs.map((log) => ({
    key: log.id,
    ...propsRender(log),
  }));
};

import type { Log } from '@/typings';
import type { TimelineItemProps } from 'antd';
import { propsRender } from '../utils';

export const recordItems: (items: Log[]) => TimelineItemProps[] = (items) => {
  return items.map((item) => {
    return {
      key: item.id,
      ...propsRender(item),
    };
  });
};

import { Spin } from 'antd';
import { FC } from 'react';
import classes from './index.module.less';

/**
 * 页面中组件加载
 *
 * @author Jia-Yao Zhao
 */
export const ChunkLoading: FC = () => {
  return (
    <div className={classes.chunkLoading}>
      <Spin />
    </div>
  );
};

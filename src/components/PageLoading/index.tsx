import { Spin } from 'antd';
import type { FC } from 'react';
import classes from './index.module.less';

/**
 * 页面中组件加载
 *
 * @author Jia-Yao Zhao
 */
export const PageLoading: FC = () => {
  return (
    <div className={classes.chunkLoading}>
      <Spin />
    </div>
  );
};

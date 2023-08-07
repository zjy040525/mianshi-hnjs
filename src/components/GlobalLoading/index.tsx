import { Spin } from 'antd';
import type { FC } from 'react';
import classes from './index.module.less';

/**
 * 首屏加载
 *
 * @author Jia-Yao Zhao
 */
export const GlobalLoading: FC = () => (
  <div className={classes.globalLoading}>
    <Spin size="large" />
  </div>
);

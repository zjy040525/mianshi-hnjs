import { Button, Result, Typography } from 'antd';
import { FC } from 'react';
import { useRouteError } from 'react-router-dom';
import classes from './index.module.less';

/**
 * 全局错误捕获
 *
 * @author Jia-Yao Zhao
 */
export const GlobalErrorBoundary: FC = () => {
  const error = useRouteError() as string;

  return (
    <Result
      className={classes.globalErrorBoundary}
      status="error"
      title="未知错误"
      subTitle="网站在运行时发生了未知的错误，请重试或向管理员报告此问题！"
      extra={[
        <Button
          type="primary"
          key="retry"
          onClick={() => window.location.reload()}
        >
          重试
        </Button>,
        <Button
          key="report"
          href="mailto:jiayao.zhao@proton.me"
          target="_blank"
        >
          报告此问题
        </Button>,
      ]}
    >
      <Typography.Paragraph style={{ marginBlockEnd: 0 }}>
        {error.toString()}
      </Typography.Paragraph>
    </Result>
  );
};

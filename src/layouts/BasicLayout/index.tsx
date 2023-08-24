import { PageLoading } from '@/components';
import { Layout, Typography, theme } from 'antd';
import type { FC } from 'react';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthorizedDropdown, AuthorizedMenu } from './components';
import classes from './index.module.less';

const { Content, Header } = Layout;

export const BasicLayout: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();

  return (
    <Layout className={classes.layout}>
      <Header
        className={classes.header}
        style={{ background: colorBgContainer }}
      >
        <div style={{ marginInlineEnd: 50, flexShrink: 0 }}>
          <span className={classes.navigate}>
            <img
              src="/vite.svg"
              alt=""
              draggable={false}
              width={32}
              height={32}
            />
            <Typography.Title className={classes.title} level={5}>
              {import.meta.env.VITE_APP_NAME}
            </Typography.Title>
          </span>
        </div>
        <AuthorizedMenu />
        <AuthorizedDropdown />
      </Header>
      <Content className={classes.content}>
        <Suspense key={location.key} fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

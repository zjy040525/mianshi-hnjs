import { PageLoading } from '@/components';
import {
  AUTHENTICATION_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '@/constants';
import { authorizationStateSelector } from '@/selectors';
import {
  EditOutlined,
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography, theme } from 'antd';
import { FC, Suspense, useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { HasAuthorizationFeature } from './components';
import classes from './index.module.less';

const { Content, Header } = Layout;

export const BasicLayout: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  // 是否显示`认证`菜单选项
  const showAuthentication = useCallback(() => {
    if (authorization.token) {
      return [];
    }
    return {
      icon: <LockOutlined />,
      key: AUTHENTICATION_PATHNAME,
      label: '认证',
    };
  }, [authorization]);
  // 是否显示`签到`菜单选项
  const showSign = useCallback(() => {
    if (authorization.token && authorization.permission === 'SIGN') {
      return {
        icon: <SolutionOutlined />,
        key: STUDENT_SIGN_IN_PATHNAME,
        label: '签到',
      };
    }
    return [];
  }, [authorization]);
  // 是否显示`面试`菜单选项
  const showInterview = useCallback(() => {
    if (authorization.token && authorization.permission === 'INTERVIEW') {
      return {
        icon: <EditOutlined />,
        key: INTERVIEW_PATHNAME,
        label: '面试',
      };
    }
    return [];
  }, [authorization]);
  // 是否显示`管理`菜单选项
  const showManage = useCallback(() => {
    if (authorization.token && authorization.permission === 'MANAGE') {
      return {
        icon: <SettingOutlined />,
        key: MANAGE_PATHNAME,
        label: '管理',
      };
    }
    return [];
  }, [authorization]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

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
              海宁技师学院面试管理系统
            </Typography.Title>
          </span>
        </div>
        <Menu
          className={classes.menu}
          mode="horizontal"
          items={[{ icon: <HomeOutlined />, key: '/', label: '主页' }]
            .concat(showAuthentication())
            .concat(showSign())
            .concat(showInterview())
            .concat(showManage())}
          selectedKeys={[location.pathname]}
          onSelect={selectInfo => navigate(selectInfo.key)}
        />
        <HasAuthorizationFeature />
      </Header>
      <Content className={classes.content}>
        <Suspense key={location.key} fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

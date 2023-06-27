import {
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Dropdown, Layout, Menu, Typography, theme } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import ChunkLoading from '../../components/ChunkLoading';
import { authStateSelector } from '../../selectors/auth';
import classes from './index.module.less';

const { Content, Header } = Layout;

const BasicLayout: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useRecoilValue(authStateSelector);
  const resetRecoilState = useResetRecoilState(authStateSelector);

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
            .concat(
              auth.token
                ? []
                : [{ icon: <LockOutlined />, key: '/auth', label: '认证' }]
            )
            .concat(
              auth.token && auth.permission === 'SIGN'
                ? [
                    {
                      icon: <SolutionOutlined />,
                      key: '/sign-in',
                      label: '签到',
                    },
                  ]
                : []
            )
            .concat(
              auth.token && auth.permission === 'INTERVIEW'
                ? [{ icon: <UserOutlined />, key: '/interview', label: '面试' }]
                : []
            )
            .concat(
              auth.token && auth.permission === 'MANAGE'
                ? [{ icon: <SettingOutlined />, key: '/manage', label: '管理' }]
                : []
            )}
          onSelect={selectInfo => navigate(selectInfo.key)}
          selectedKeys={[location.pathname]}
        />
        {auth.token ? (
          <Dropdown
            destroyPopupOnHide
            placement="bottom"
            menu={{
              items: [
                {
                  key: 'operator',
                  label: (
                    <>
                      当前身份
                      <strong style={{ paddingInlineStart: 8 }}>
                        {auth.nickname ?? auth.username}
                      </strong>
                    </>
                  ),
                  onClick() {
                    navigate('/');
                  },
                  icon: <UserOutlined />,
                },
                { type: 'divider' },
                {
                  key: 'logout',
                  label: '退出登录',
                  icon: <LogoutOutlined />,
                  onClick() {
                    resetRecoilState();
                  },
                  danger: true,
                },
              ],
            }}
          >
            <Avatar
              className={classes.avatar}
              icon={<UserOutlined />}
              draggable={false}
            />
          </Dropdown>
        ) : null}
      </Header>
      <Content className={classes.content}>
        <Suspense key={location.key} fallback={<ChunkLoading />}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

export default BasicLayout;

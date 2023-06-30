import {
  EditOutlined,
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
import {
  AUTHENTICATION_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '../../constant/pathname';
import { authorizationStateSelector } from '../../selectors/authorization';
import classes from './index.module.less';

const { Content, Header } = Layout;

const BasicLayout: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  // 是否显示`认证`菜单选项
  const showAuthentication = () => {
    if (authorization.token) {
      return [];
    }
    return {
      icon: <LockOutlined />,
      key: AUTHENTICATION_PATHNAME,
      label: '认证',
    };
  };
  // 是否显示`签到`菜单选项
  const showSign = () => {
    if (authorization.token && authorization.permission === 'SIGN') {
      return {
        icon: <SolutionOutlined />,
        key: STUDENT_SIGN_IN_PATHNAME,
        label: '签到',
      };
    }
    return [];
  };
  // 是否显示`面试`菜单选项
  const showInterview = () => {
    if (authorization.token && authorization.permission === 'INTERVIEW') {
      return {
        icon: <EditOutlined />,
        key: INTERVIEW_PATHNAME,
        label: '面试',
      };
    }
    return [];
  };
  // 是否显示`管理`菜单选项
  const showManage = () => {
    if (authorization.token && authorization.permission === 'MANAGE') {
      return {
        icon: <SettingOutlined />,
        key: MANAGE_PATHNAME,
        label: '管理',
      };
    }
    return [];
  };
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
        <Suspense key={location.key} fallback={<ChunkLoading />}>
          <Outlet />
        </Suspense>
      </Content>
    </Layout>
  );
};

/**
 * 操作员登录成功后，显示的额外内容
 *
 * @author Jia-Yao Zhao
 */
const HasAuthorizationFeature: FC = () => {
  const navigate = useNavigate();
  const authorization = useRecoilValue(authorizationStateSelector);
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  if (authorization.token) {
    return (
      <>
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
                      {authorization.nickname ?? authorization.username}
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
      </>
    );
  }
  return null;
};

export default BasicLayout;

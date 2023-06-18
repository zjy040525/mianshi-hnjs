import {
  HomeOutlined,
  LockOutlined,
  SettingOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography, theme } from 'antd';
import { FC, Suspense } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../../atoms/auth';
import ChunkLoading from '../../components/ChunkLoading';
import classes from './index.module.less';

const { Content, Header } = Layout;
const { Title } = Typography;

const BasicLayout: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const tokenState = useRecoilValue(tokenStateAtom);
  const permissionState = useRecoilValue(permissionStateAtom);

  return (
    <Layout className={classes.layout}>
      <Header
        className={classes.header}
        style={{ background: colorBgContainer }}
      >
        <div style={{ marginInlineEnd: 50 }}>
          <span className={classes.navigate}>
            <img
              src="/vite.svg"
              alt=""
              draggable={false}
              width={32}
              height={32}
            />
            <Title className={classes.title} level={5}>
              海宁技师学院面试管理系统
            </Title>
          </span>
        </div>
        <Menu
          className={classes.menu}
          mode="horizontal"
          items={[{ icon: <HomeOutlined />, key: '/', label: '主页' }]
            .concat(
              tokenState
                ? []
                : [{ icon: <LockOutlined />, key: '/auth', label: '认证' }]
            )
            .concat(
              permissionState === 'SIGN'
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
              permissionState === 'INTERVIEW'
                ? [{ icon: <UserOutlined />, key: '/interview', label: '面试' }]
                : []
            )
            .concat(
              permissionState === 'MANAGE'
                ? [{ icon: <SettingOutlined />, key: '/manage', label: '管理' }]
                : []
            )}
          onSelect={selectInfo => navigate(selectInfo.key)}
          selectedKeys={[location.pathname]}
        />
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

import {
  AUTHENTICATION_PATHNAME,
  MANAGE_PATHNAME,
  STUDENT_INTERVIEW_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '@/constants';
import { authorizationStateSelector } from '@/selectors';
import {
  EditOutlined,
  HomeOutlined,
  LoginOutlined,
  SettingOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import classes from './index.module.less';

export const AuthorizedMenu: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  // 是否显示`登录`菜单选项
  const showAuthentication = useCallback(() => {
    if (authorization.token) {
      return [];
    }
    return {
      icon: <LoginOutlined />,
      key: AUTHENTICATION_PATHNAME,
      label: '登录',
    };
  }, [authorization]);
  // 是否显示`签到`菜单选项
  const showSign = useCallback(() => {
    if (authorization.token && authorization.role === 'sign-all') {
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
    if (authorization.token && authorization.role === 'interview-all') {
      return {
        icon: <EditOutlined />,
        key: STUDENT_INTERVIEW_PATHNAME,
        label: '面试',
      };
    }
    return [];
  }, [authorization]);
  // 是否显示`管理`菜单选项
  const showManage = useCallback(() => {
    if (authorization.token && authorization.role === 'admin-all') {
      return {
        icon: <SettingOutlined />,
        key: MANAGE_PATHNAME,
        label: '管理',
      };
    }
    return [];
  }, [authorization]);
  const navigate = useNavigate();
  return (
    <Menu
      className={classes.menu}
      mode="horizontal"
      items={[{ icon: <HomeOutlined />, key: '/', label: '主页' }]
        .concat(showAuthentication())
        .concat(showSign())
        .concat(showInterview())
        .concat(showManage())}
      selectedKeys={[location.pathname]}
      onSelect={(selectInfo) => navigate(selectInfo.key)}
    />
  );
};

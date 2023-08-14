import { AUTHENTICATION_PATHNAME } from '@/constants';
import { authorizationStateSelector } from '@/selectors';
import type { Role } from '@/typings';
import { useMount } from 'ahooks';
import { App as AntdApp } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

/**
 * 角色权限验证
 * @param children 有权限时的显示
 * @param role 指定访问该子组件的需要的角色权限
 * @returns
 */
export const Access: FC<PropsWithChildren<{ role: Role }>> = ({
  children,
  role,
}) => {
  const { message } = AntdApp.useApp();
  const authorization = useRecoilValue(authorizationStateSelector);
  useMount(() => {
    if (!authorization.token) {
      message.error('请先认证！');
    } else if (authorization.role !== role) {
      message.error('权限不足！');
    }
  });
  if (!authorization.token) {
    return <Navigate to={AUTHENTICATION_PATHNAME} />;
  } else if (authorization.role !== role) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};

import { AUTHENTICATION_PATHNAME } from '@/constants';
import { authorizationStateSelector } from '@/selectors';
import type { Permission } from '@/typings';
import { useMount } from 'ahooks';
import { App as AntdApp } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

/**
 * 权限
 * @param children 认证成功后显示的子组件
 * @param permission 指定访问该子组件的需要的权限
 * @returns
 */
export const Access: FC<PropsWithChildren<{ permission: Permission }>> = ({
  children,
  permission,
}) => {
  const { message } = AntdApp.useApp();
  const authorization = useRecoilValue(authorizationStateSelector);
  useMount(() => {
    if (!authorization.token) {
      message.error('请先认证！');
    } else if (authorization.permission !== permission) {
      message.error('权限不足！');
    }
  });
  if (!authorization.token) {
    return <Navigate to={AUTHENTICATION_PATHNAME} />;
  } else if (authorization.permission !== permission) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};
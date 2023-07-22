import { useMount } from 'ahooks';
import { App as AntdApp } from 'antd';
import { FC, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenStateAtom } from '../../../../atoms';

export const CheckAuthentication: FC<PropsWithChildren> = ({ children }) => {
  const tokenState = useRecoilValue(tokenStateAtom);
  const { message } = AntdApp.useApp();
  useMount(() => {
    if (tokenState) {
      message.error('你已登录，请先退出登录！');
    }
  });
  return tokenState ? <Navigate to="/" /> : children;
};

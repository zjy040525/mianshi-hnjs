import { authorizationStateSelector } from '@/selectors';
import { authorizationService } from '@/services';
import { getAuthorizationToken } from '@/utils';
import { useMount, useRequest } from 'ahooks';
import { App as AntdApp } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

/**
 * 授权守卫，对当前登录者的身份进行验证
 * @param children 验证成功后的显示
 * @author Jia-Yao Zhao
 */
export const AuthorizationGuard: FC<PropsWithChildren> = ({ children }) => {
  const { message } = AntdApp.useApp();
  const setAuthorization = useSetRecoilState(authorizationStateSelector);
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  const token = getAuthorizationToken();
  const { run: runAuthorization } = useRequest(authorizationService, {
    manual: true,
    onSuccess({ data }) {
      // 保存正确的用户信息
      setAuthorization({ ...data, token });
    },
    onError(err) {
      // 验证失败，退出当前登录状态，要求重新登录
      resetRecoilState();
      message.error(err.message);
    },
  });
  useMount(() => {
    if (token) {
      runAuthorization();
    } else {
      resetRecoilState();
    }
  });
  return <>{children}</>;
};

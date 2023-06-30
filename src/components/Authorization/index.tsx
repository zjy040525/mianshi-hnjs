import { useMount, useRequest } from 'ahooks';
import { App as AntdApp } from 'antd';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizationStateSelector } from '../../selectors/authorization';
import { authorizationService } from '../../services/auth';
import { getAuthorizationToken } from '../../utils/storage';

/**
 * 验证当前身份的有效性
 *
 * @author Jia-Yao Zhao
 */
const Authorization = () => {
  const { message } = AntdApp.useApp();
  const setAuthorization = useSetRecoilState(authorizationStateSelector);
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  const token = getAuthorizationToken();
  const { run: runAuthorization } = useRequest(authorizationService, {
    manual: true,
    onSuccess({ data }) {
      // 保存正确的操作员信息
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
  return null;
};

export default Authorization;

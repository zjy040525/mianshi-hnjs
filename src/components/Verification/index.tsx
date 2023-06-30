import { useMount, useRequest } from 'ahooks';
import { App as AntdApp } from 'antd';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authStateSelector } from '../../selectors/auth';
import { authValidationService } from '../../services/auth';
import { getAuthToken } from '../../utils/storage';

/**
 * 验证当前身份的有效性
 *
 * @author Jia-Yao Zhao
 */
const Verification = () => {
  const { message } = AntdApp.useApp();
  const setAuth = useSetRecoilState(authStateSelector);
  const resetRecoilState = useResetRecoilState(authStateSelector);
  const token = getAuthToken();
  const { run: runAuth } = useRequest(authValidationService, {
    manual: true,
    onSuccess({ data }) {
      // 保存正确的操作员信息
      setAuth({ ...data, token });
    },
    onError(err) {
      // 验证失败，退出当前登录状态，要求重新登录
      resetRecoilState();
      message.error(err.message);
    },
  });
  useMount(() => {
    if (token) {
      runAuth();
    } else {
      resetRecoilState();
    }
  });
  return null;
};

export default Verification;

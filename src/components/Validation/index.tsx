import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authStateSelector } from '../../selectors/auth';
import { authValidationService } from '../../services/auth';
import { getAuthToken, removeAuthToken } from '../../utils/storage';

/**
 * 验证当前身份的有效性
 *
 * @author Jia-Yao Zhao
 */
const Validation = () => {
  const { message } = AntdApp.useApp();
  const localToken = getAuthToken();
  const [auth, setAuth] = useRecoilState(authStateSelector);
  const resetHandler = () => {
    setAuth({
      id: null,
      token: null,
      username: null,
      nickname: null,
      permission: null,
    });
    removeAuthToken();
  };

  useEffect(() => {
    if (localToken && localToken === auth.token) {
      authValidationService()
        .then(({ data }) => {
          if (data.permission === auth.permission) {
            // 保存用户信息
            setAuth({ ...data, token: auth.token });
          } else {
            // 验证失败退出当前登录状态，要求重新登录
            resetHandler();
          }
        })
        .catch(err => {
          // 验证失败，退出当前登录状态，要求重新登录
          resetHandler();
          message.error(err.message);
        });
    } else {
      resetHandler();
    }
  }, []);
  return null;
};

export default Validation;

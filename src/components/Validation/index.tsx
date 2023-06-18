import { App as AntdApp } from 'antd';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../../atoms/auth';
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
  const token = getAuthToken();
  const tokenState = useRecoilValue(tokenStateAtom);
  const setAuth = useSetRecoilState(authStateSelector);
  const permission = useRecoilValue(permissionStateAtom);
  const resetHandler = () => {
    setAuth({ token: null, permission: null });
    removeAuthToken();
  };

  useEffect(() => {
    if (token && token === tokenState) {
      authValidationService()
        .then(({ data }) => {
          // 验证成功不做任何操作，验证失败退出当前登录状态，要求重新登录
          if (data.permission !== permission) {
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

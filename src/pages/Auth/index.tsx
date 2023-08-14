import { HeadTitle } from '@/components';
import { authorizationStateSelector } from '@/selectors';
import { authenticationService } from '@/services';
import { useRequest } from 'ahooks';
import {
  App as AntdApp,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Typography,
} from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { CheckAuthentication } from './components';
import { AUTHENTICATION_MESSAGE_KEY } from './constants';
import classes from './index.module.less';

/**
 * 用户身份认证
 *
 * @author Jia-Yao Zhao
 */
const Authentication: FC = () => {
  const setAuthorization = useSetRecoilState(authorizationStateSelector);
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  // 身份认证服务
  const { run, loading } = useRequest(authenticationService, {
    manual: true,
    onBefore() {
      message.open({
        key: AUTHENTICATION_MESSAGE_KEY,
        type: 'loading',
        content: '登录中…',
        duration: 0,
      });
    },
    onSuccess(res) {
      setAuthorization({ ...res.data });
      message.open({
        key: AUTHENTICATION_MESSAGE_KEY,
        type: 'success',
        content: res.message,
      });
      navigate('/');
    },
    onError(err) {
      resetRecoilState();
      message.open({
        key: AUTHENTICATION_MESSAGE_KEY,
        type: 'error',
        content: `登录失败，${err.message}`,
      });
    },
  });
  return (
    <CheckAuthentication>
      <HeadTitle titles={['登录']} />
      <Card className={classes.card}>
        <Typography.Title level={3}>用户登录</Typography.Title>
        <Divider />
        <Form
          scrollToFirstError
          autoComplete="off"
          onFinish={(values) => {
            run(values.username, values.password);
          }}
          disabled={loading}
        >
          <Form.Item
            name="username"
            colon={false}
            label="用户名"
            rules={[
              { required: true, message: '请填写用户名' },
              { whitespace: true, message: '请填写用户名' },
              { max: 50, message: '用户名长度不得大于50个字符' },
            ]}
            hasFeedback
          >
            <Input autoFocus maxLength={50} showCount />
          </Form.Item>
          <Form.Item
            name="password"
            colon={false}
            label="密码"
            rules={[
              { required: true, message: '请填写密码' },
              { whitespace: true, message: '请填写密码' },
              { min: 8, message: '密码长度不得少于8个字符' },
              { max: 32, message: '密码长度不得大于32个字符' },
            ]}
            hasFeedback
          >
            <Input.Password maxLength={32} showCount />
          </Form.Item>
          <Form.Item className={classes.submit}>
            <Button htmlType="submit" type="primary">
              {loading ? '登录中…' : '登录'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </CheckAuthentication>
  );
};

export default Authentication;

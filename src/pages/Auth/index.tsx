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
import { FC, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tokenStateAtom } from '../../atoms/auth';
import HeadTitle from '../../components/HeadTitle';
import { AUTH_MESSAGE_KEY } from '../../constant/msg';
import { authStateSelector } from '../../selectors/auth';
import { authService } from '../../services/auth';
import classes from './index.module.less';

const { Title, Paragraph } = Typography;

/**
 * 用户身份认证
 *
 * @author Jia-Yao Zhao
 */
const Auth: FC = () => {
  const setAuth = useSetRecoilState(authStateSelector);
  const { message } = AntdApp.useApp();
  const navigate = useNavigate();
  // 身份认证服务
  const { run, loading } = useRequest(authService, {
    manual: true,
    onBefore() {
      message.open({
        key: AUTH_MESSAGE_KEY,
        type: 'loading',
        content: '认证中…',
        duration: 0,
      });
    },
    onSuccess(res) {
      setAuth({
        token: res.data.token,
        permission: res.data.permission,
      });
      message.open({
        key: AUTH_MESSAGE_KEY,
        type: 'success',
        content: res.message,
      });
      navigate('/');
    },
    onError(err) {
      setAuth({ token: null, permission: null });
      message.open({
        key: AUTH_MESSAGE_KEY,
        type: 'error',
        content: `认证失败，${err.message}`,
      });
    },
  });

  return (
    <>
      <HeadTitle titles={['身份认证']} />
      <Card className={classes.card}>
        <Title level={3}>身份认证</Title>
        <Divider />
        <Paragraph type="warning">
          使用提供的用户名称和认证密码进行身份认证
        </Paragraph>
        <Form
          scrollToFirstError
          autoComplete="off"
          onFinish={values => {
            run(values.username, values.password);
          }}
          disabled={loading}
        >
          <Form.Item
            name="username"
            colon={false}
            label="用户名称"
            rules={[
              { required: true, message: '请填写用户名称' },
              { whitespace: true, message: '请填写用户名称' },
              { max: 50, message: '用户名称长度不得大于50个字符' },
            ]}
            hasFeedback
          >
            <Input autoFocus maxLength={50} showCount />
          </Form.Item>
          <Form.Item
            name="password"
            colon={false}
            label="认证密码"
            rules={[
              { required: true, message: '请填写认证密码' },
              { whitespace: true, message: '请填写认证密码' },
              { min: 8, message: '认证密码长度不得少于8个字符' },
              { max: 32, message: '认证密码长度不得大于32个字符' },
            ]}
            hasFeedback
          >
            <Input.Password maxLength={32} showCount />
          </Form.Item>
          <Form.Item className={classes.submit}>
            <Button htmlType="submit" type="primary">
              {loading ? '认证中…' : '认证'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

/**
 * 身份验证模块验证
 *
 * @author Jia-Yao Zhao
 */
const AuthProvider: FC = () => {
  const token = useRecoilValue(tokenStateAtom);
  const { message } = AntdApp.useApp();
  useEffect(() => {
    if (token) {
      message.error('你已登录，请先退出登录！');
    }
  }, []);
  return token ? <Navigate to="/" /> : <Auth />;
};

export default AuthProvider;

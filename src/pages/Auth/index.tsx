import { HeadTitle } from '@/components';
import { authorizationStateSelector } from '@/selectors';
import { authenticationService } from '@/services';
import { LoginOutlined } from '@ant-design/icons';
import { useRequest, useUnmount } from 'ahooks';
import { App as AntdApp, Button, Card, Form, Input } from 'antd';
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
  const {
    run: runLogin,
    loading,
    cancel: cancelLogin,
  } = useRequest(authenticationService, {
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
      // 登录成功用独立的message提示，因为用同一个message key会导致三个情况（登录中/登录成功/登录失败）都会因为离开页面而关闭，即不会显示登录成功的消息了
      message.destroy(AUTHENTICATION_MESSAGE_KEY);
      message.success(res.message);
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
  // 登录中/在登录中前往了其他页面，需要取消登录和关闭消息
  useUnmount(() => {
    cancelLogin();
    message.destroy(AUTHENTICATION_MESSAGE_KEY);
  });
  return (
    <CheckAuthentication>
      <HeadTitle titles={['登录']} />
      <Card className={classes.cardBox} title="用户登录" bordered={false}>
        <Form
          autoComplete="off"
          colon={false}
          onFinish={(values) => runLogin(values.username, values.password)}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
              {
                whitespace: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input
              disabled={loading}
              autoFocus
              maxLength={50}
              allowClear
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
              {
                whitespace: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password
              disabled={loading}
              maxLength={32}
              placeholder="密码"
            />
          </Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            block
            size="large"
            style={{
              marginBlockStart: 24,
            }}
            loading={loading}
            icon={<LoginOutlined />}
          >
            登录
          </Button>
        </Form>
      </Card>
    </CheckAuthentication>
  );
};

export default Authentication;

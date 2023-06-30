import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Switch } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { newMsgNotificationOfAdmin } from '../../atoms/manage';
import HeadTitle from '../../components/HeadTitle';
import { AUTH_PATHNAME } from '../../constant/path';
import { authStateSelector } from '../../selectors/auth';

const Home: FC = () => {
  const auth = useRecoilValue(authStateSelector);
  const navigate = useNavigate();
  const resetRecoilState = useResetRecoilState(authStateSelector);

  return (
    <>
      <HeadTitle />
      <Row gutter={[16, 16]}>
        <HasManageFeature />
        <Col>
          <Card title={auth.nickname ?? auth.username}>
            {auth.token ? (
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                danger
                onClick={resetRecoilState}
              >
                退出登录
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<LoginOutlined />}
                onClick={() => navigate(AUTH_PATHNAME)}
              >
                前往认证
              </Button>
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

/**
 * 管理身份登录时，首页的额外内容
 *
 * @author Jia-Yao Zhao
 */
const HasManageFeature: FC = () => {
  const auth = useRecoilValue(authStateSelector);
  const [newMsgNotification, setNewMsgNotification] = useRecoilState(
    newMsgNotificationOfAdmin
  );
  if (auth.permission === 'MANAGE') {
    return (
      <Col>
        <Card title="设置">
          <Space size={16}>
            新消息通知
            <Switch
              checked={newMsgNotification}
              onChange={setNewMsgNotification}
            />
          </Space>
        </Card>
      </Col>
    );
  }
  return null;
};

export default Home;

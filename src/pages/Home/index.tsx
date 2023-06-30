import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Switch } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { newMsgNotificationOfAdmin } from '../../atoms/manage';
import HeadTitle from '../../components/HeadTitle';
import { AUTHENTICATION_PATHNAME } from '../../constant/pathname';
import { authorizationStateSelector } from '../../selectors/authorization';

const Home: FC = () => {
  const navigate = useNavigate();
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  const authorization = useRecoilValue(authorizationStateSelector);

  return (
    <>
      <HeadTitle />
      <Row gutter={[16, 16]}>
        <HasManageFeature />
        <Col>
          <Card title={authorization.nickname ?? authorization.username}>
            {authorization.token ? (
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
                onClick={() => navigate(AUTHENTICATION_PATHNAME)}
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
  const authorization = useRecoilValue(authorizationStateSelector);
  const [newMsgNotification, setNewMsgNotification] = useRecoilState(
    newMsgNotificationOfAdmin
  );
  if (authorization.permission === 'MANAGE') {
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

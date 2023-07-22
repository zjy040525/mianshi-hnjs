import { HeadTitle } from '@/components';
import { AUTHENTICATION_PATHNAME } from '@/constants';
import { authorizationStateSelector } from '@/selectors';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { HasManageFeature } from './components';

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
          <Card
            title={authorization.nickname ?? authorization.username ?? '未登录'}
          >
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

export default Home;

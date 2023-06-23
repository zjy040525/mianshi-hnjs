import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import HeadTitle from '../../components/HeadTitle';
import { AUTH_PATHNAME } from '../../constant/path';
import { authStateSelector } from '../../selectors/auth';

const Home: FC = () => {
  const [auth, setAuth] = useRecoilState(authStateSelector);
  const navigate = useNavigate();
  const logoutHandler = () => {
    setAuth({ token: null, permission: null, nickname: null });
  };

  return (
    <>
      <HeadTitle />
      <Row gutter={[16, 16]}>
        <Col>
          <Card>
            {auth.token ? (
              <Button
                type="primary"
                icon={<LogoutOutlined />}
                danger
                onClick={logoutHandler}
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

export default Home;

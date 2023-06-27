import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
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
        <Col>
          <Card>
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

export default Home;

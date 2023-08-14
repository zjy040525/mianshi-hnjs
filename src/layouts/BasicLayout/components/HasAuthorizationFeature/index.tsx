import { authorizationStateSelector } from '@/selectors';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown } from 'antd';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import classes from './index.module.less';

export const HasAuthorizationFeature: FC = () => {
  const navigate = useNavigate();
  const authorization = useRecoilValue(authorizationStateSelector);
  const resetRecoilState = useResetRecoilState(authorizationStateSelector);
  if (authorization.token) {
    return (
      <>
        <Dropdown
          destroyPopupOnHide
          placement="bottom"
          menu={{
            items: [
              {
                key: 'user',
                label: (
                  <>
                    当前身份
                    <strong style={{ paddingInlineStart: 8 }}>
                      {authorization.nickname ?? authorization.username}
                    </strong>
                  </>
                ),
                onClick() {
                  navigate('/');
                },
                icon: <UserOutlined />,
              },
              { type: 'divider' },
              {
                key: 'logout',
                label: '退出登录',
                icon: <LogoutOutlined />,
                onClick() {
                  resetRecoilState();
                },
                danger: true,
              },
            ],
          }}
        >
          <Avatar
            className={classes.avatar}
            icon={<UserOutlined />}
            draggable={false}
          />
        </Dropdown>
      </>
    );
  }
  return null;
};

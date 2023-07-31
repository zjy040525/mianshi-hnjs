import { newMsgNotificationOfAdmin } from '@/atoms';
import { authorizationStateSelector } from '@/selectors';
import { Card, Col, Space, Switch, Typography } from 'antd';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const HasManageFeature: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  const [newMsgNotification, setNewMsgNotification] = useRecoilState(
    newMsgNotificationOfAdmin,
  );
  if (authorization.permission === 'MANAGE') {
    return (
      <Col>
        <Card title="设置">
          <Space direction="vertical">
            <Space size={16}>
              <Typography.Text>接收新消息通知</Typography.Text>
              <Switch
                checked={newMsgNotification}
                onChange={setNewMsgNotification}
              />
            </Space>
          </Space>
        </Card>
      </Col>
    );
  }
  return null;
};

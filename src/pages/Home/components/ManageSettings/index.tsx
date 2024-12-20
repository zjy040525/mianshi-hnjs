import { adminNewMsgNotification } from '@/atoms';
import { authorizationStateSelector } from '@/selectors';
import { Card, Col, Space, Switch, Typography } from 'antd';
import type { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export const ManageSettings: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  const [newMsgNotification, setNewMsgNotification] = useRecoilState(
    adminNewMsgNotification,
  );
  if (authorization.role === 'admin-all') {
    return (
      <Col>
        <Card title="设置" bordered={false}>
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

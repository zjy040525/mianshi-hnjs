import { tokenStateAtom } from '@/atoms';
import { Access, HeadTitle } from '@/components';
import { logRemoveAllService, logSocket } from '@/services';
import type { Log } from '@/typings';
import { ClearOutlined } from '@ant-design/icons';
import { useRequest, useUnmount, useWebSocket } from 'ahooks';
import {
  App as AntdApp,
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Timeline,
} from 'antd';
import { useState, type FC } from 'react';
import { useRecoilValue } from 'recoil';
import { logsRender } from './components';
import { LOG_REMOVE_KEY } from './constants';

const ManageLog: FC = () => {
  const [logList, setLogList] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const { notification, message } = AntdApp.useApp();
  const token = useRecoilValue(tokenStateAtom);
  const logWs = useWebSocket(logSocket(), {
    onOpen(_event, instance) {
      const msg = { token };
      // 连接成功后发送token进行验证
      instance.send(JSON.stringify(msg));
    },
    onMessage(msg) {
      const data = JSON.parse(msg.data);
      // 如果有type属性，就是notification提示消息
      if (data.type) {
        notification.open({
          ...data,
          placement: 'bottomRight',
        });
        return;
      }

      const values: {
        logList: Log[];
      } = data;
      // 更新数据
      setLogList(values.logList);
      setLoading(false);
    },
  });
  useUnmount(() => {
    logWs.disconnect();
  });

  const { run: runRemoveAll, loading: removing } = useRequest(
    logRemoveAllService,
    {
      manual: true,
      onError(err) {
        message.open({
          key: LOG_REMOVE_KEY,
          type: 'error',
          content: err.message,
        });
      },
    },
  );
  return (
    <Access role="admin-all">
      <HeadTitle titles={['日志管理']} />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title="最新动态（实时更新）"
            extra={
              <Button
                danger
                icon={<ClearOutlined />}
                onClick={runRemoveAll}
                disabled={!logList.length}
                loading={removing}
                type="text"
                shape="circle"
              />
            }
            bordered={false}
          >
            {loading ? (
              <Skeleton active />
            ) : (
              <Timeline reverse items={logsRender(logList)} pending />
            )}
          </Card>
        </Col>
      </Row>
    </Access>
  );
};

export default ManageLog;

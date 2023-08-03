import { adminNewMsgNotification, tokenStateAtom } from '@/atoms';
import { HeadTitle, PermissionGuard } from '@/components';
import { operationSocket, statisticSocket } from '@/services';
import type { Student } from '@/typings';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useMount, useUnmount, useWebSocket } from 'ahooks';
import {
  App as AntdApp,
  Card,
  Col,
  Row,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ColumnFilterItem } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { badge } from './components';
import { filterMap } from './utils';

/**
 * 管理组件
 *
 * @author Jia-Yao Zhao
 */
const Manage: FC = () => {
  // 筛选过滤条件
  const [signedOperatorFilters, setSignedOperatorFilters] = useState<
    ColumnFilterItem[]
  >([]);
  const [interviewedOperatorFilters, setInterviewedOperatorFilters] = useState<
    ColumnFilterItem[]
  >([]);
  // 表格设置
  const columns: ColumnsType<Student> = [
    {
      title: '系统序号',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '身份证',
      dataIndex: 'id_card',
    },
    {
      title: '初中就读学校',
      dataIndex: 'graduated_school',
    },
    {
      title: '手机号',
      dataIndex: 'telephone_number',
    },
    {
      title: '中考报名序号',
      dataIndex: 'registration_number',
    },
    {
      title: '签到状态',
      dataIndex: 'sign_status',
      render(status) {
        return status ? (
          <Typography.Text type="success">
            <CheckCircleFilled />
          </Typography.Text>
        ) : (
          <Typography.Text type="danger">
            <CloseCircleFilled />
          </Typography.Text>
        );
      },
      filters: [
        {
          text: '已签到',
          value: true,
        },
        {
          text: '未签到',
          value: false,
        },
      ],
      filterMultiple: false,
      onFilter(value, record) {
        return record.sign_status === value;
      },
    },
    {
      title: '签到时间',
      dataIndex: 'signed_date',
      render(dateTime) {
        if (dateTime) {
          return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        }
        return '-';
      },
      sorter: (a, b) =>
        (a.signed_date ? Date.parse(a.signed_date) : 0) -
        (b.signed_date ? Date.parse(b.signed_date) : 0),
    },
    {
      title: '签到操作员',
      dataIndex: 'signed_operator',
      render(signedOperator) {
        if (signedOperator) {
          return signedOperator.nickname ?? signedOperator.username;
        }
        return '-';
      },
      filters: signedOperatorFilters,
      onFilter(value, record) {
        return record.signed_operator?.id === value;
      },
    },
    {
      title: '学前面试进度',
      dataIndex: 'interview_xq',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.interview_xq === value;
        }
        return record.interview_xq === null;
      },
    },
    {
      title: '旅游面试进度',
      dataIndex: 'interview_ly',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.interview_ly === value;
        }
        return record.interview_ly === null;
      },
    },
    {
      title: '轨道面试进度',
      dataIndex: 'interview_gd',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.interview_gd === value;
        }
        return record.interview_gd === null;
      },
    },
    {
      title: '面试时间',
      dataIndex: 'interviewed_date',
      render(dateTime) {
        if (dateTime) {
          return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
        }
        return '-';
      },
      sorter: (a, b) =>
        (a.interviewed_date ? Date.parse(a.interviewed_date) : 0) -
        (b.interviewed_date ? Date.parse(b.interviewed_date) : 0),
    },
    {
      title: '面试操作员',
      dataIndex: 'interviewed_operator',
      render(interviewedOperator) {
        if (interviewedOperator) {
          return interviewedOperator.nickname ?? interviewedOperator.username;
        }
        return '-';
      },
      filters: interviewedOperatorFilters,
      onFilter(value, record) {
        return record.interviewed_operator?.id === value;
      },
    },
  ];
  const { notification } = AntdApp.useApp();
  const [students, setStudents] = useState<Student[]>([]);
  // 统计人数
  const [counts, setCounts] = useState({
    signedCount: -1,
    noSignedCount: -1,
    interviewedCount: -1,
    noInterviewedCount: -1,
  });
  const token = useRecoilValue(tokenStateAtom);
  // 操作信息socket
  const operationWs = useWebSocket(operationSocket(), {
    // 需要手动连接
    manual: true,
    onOpen(_event, instance) {
      const msg = { token };
      // 连接成功后发送token进行验证
      instance.send(JSON.stringify(msg));
    },
    onMessage(msg) {
      if (newMsgNotification) {
        const data = JSON.parse(msg.data);
        // 通知消息
        notification.open({
          ...data,
          placement: 'bottomRight',
        });
      }
    },
  });
  const newMsgNotification = useRecoilValue(adminNewMsgNotification);
  // 只有在`新消息通知`为启用状态下，才会连接到对应的socket
  useMount(() => {
    if (newMsgNotification) {
      operationWs.connect();
    }
  });
  // 统计信息socket
  const statisticWs = useWebSocket(statisticSocket(), {
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
        counts: typeof counts;
        students: Student[];
      } = data;
      // 更新数据
      setCounts(values.counts);
      setStudents(values.students);
      // 设置可筛选过滤的条件
      setSignedOperatorFilters(filterMap('signed_operator', values.students));
      setInterviewedOperatorFilters(
        filterMap('interviewed_operator', values.students),
      );
    },
  });
  // 组件卸载，需要断开WebSocket的连接
  useUnmount(() => {
    operationWs.disconnect();
    statisticWs.disconnect();
  });
  return (
    <PermissionGuard permission="MANAGE">
      <HeadTitle titles={['管理']} />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已签到人数"
                  loading={
                    statisticWs.readyState !== 1 || counts.signedCount < 0
                  }
                  value={counts.signedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未签到人数"
                  loading={
                    statisticWs.readyState !== 1 || counts.noSignedCount < 0
                  }
                  value={counts.noSignedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总人数"
                  loading={
                    statisticWs.readyState !== 1 ||
                    counts.signedCount + counts.noSignedCount < 0
                  }
                  value={counts.signedCount + counts.noSignedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="签到进度"
                  loading={
                    statisticWs.readyState !== 1 ||
                    counts.signedCount + counts.noSignedCount < 0
                  }
                  value={
                    (counts.signedCount /
                      (counts.signedCount + counts.noSignedCount)) *
                      100 || 0
                  }
                  precision={3}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={6}></Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已面试人数"
                  loading={
                    statisticWs.readyState !== 1 || counts.interviewedCount < 0
                  }
                  value={counts.interviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未面试人数"
                  loading={
                    statisticWs.readyState !== 1 ||
                    counts.noInterviewedCount < 0
                  }
                  value={counts.noInterviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="面试进度"
                  loading={
                    statisticWs.readyState !== 1 ||
                    counts.interviewedCount + counts.noInterviewedCount < 0
                  }
                  value={
                    (counts.interviewedCount /
                      (counts.interviewedCount + counts.noInterviewedCount)) *
                      100 || 0
                  }
                  precision={3}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Table
            bordered
            columns={columns}
            rowKey={(record) => record.id_card}
            loading={statisticWs.readyState !== 1}
            dataSource={students}
            pagination={{
              defaultPageSize: 20,
              showQuickJumper: true,
            }}
          />
        </Col>
      </Row>
    </PermissionGuard>
  );
};

export default Manage;

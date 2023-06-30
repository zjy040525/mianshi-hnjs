import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useMount, useUnmount, useWebSocket } from 'ahooks';
import {
  App as AntdApp,
  Badge,
  Card,
  Col,
  Row,
  Statistic,
  Table,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenStateAtom } from '../../atoms/auth';
import HeadTitle from '../../components/HeadTitle';
import { authStateSelector } from '../../selectors/auth';
import { operationSocket, statisticSocket } from '../../services/socket';
import type { InterviewStatus, Student } from '../../types/student';

const badge = (type: InterviewStatus) => {
  switch (type) {
    case 'Processing':
      return <Badge status="processing" text="进行中" />;
    case 'Failed':
      return <Badge status="error" text="未通过" />;
    case 'Success':
      return <Badge status="success" text="已通过" />;
  }
  return '-';
};

const studentSignColumns: ColumnsType<Student> = [
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
  },
  {
    title: '学前面试进度',
    dataIndex: 'interview_xq',
    render: value => badge(value),
  },
  {
    title: '旅游面试进度',
    dataIndex: 'interview_ly',
    render: value => badge(value),
  },
  {
    title: '轨道面试进度',
    dataIndex: 'interview_gd',
    render: value => badge(value),
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
  },
];

const Manage: FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  // 统计人数
  const [
    { signedCount, noSignedCount, noInterviewedCount, interviewedCount },
    setCounts,
  ] = useState({
    signedCount: -1,
    noSignedCount: -1,
    interviewedCount: -1,
    noInterviewedCount: -1,
  });
  const { notification } = AntdApp.useApp();
  const token = useRecoilValue(tokenStateAtom);
  // 操作员的操作信息套接字
  const { disconnect: operationDisconnect } = useWebSocket(operationSocket(), {
    onMessage(ev) {
      const { key, type, message, description } = JSON.parse(ev.data);
      notification.open({
        key,
        type,
        message,
        description,
        placement: 'bottomRight',
      });
    },
    protocols: token ?? undefined,
  });
  // 统计信息套接字
  const { disconnect: statisticDisconnect, readyState: statisticReadyState } =
    useWebSocket(statisticSocket(), {
      onMessage(ev) {
        const { counts, students } = JSON.parse(ev.data);

        setCounts(counts);
        setStudents(students);
      },
      protocols: token ?? undefined,
    });

  // 组件卸载，需要断开WebSocket的连接
  useUnmount(() => {
    operationDisconnect();
    statisticDisconnect();
  });
  return (
    <>
      <HeadTitle titles={['管理']} />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已签到人数"
                  loading={statisticReadyState !== 1 || signedCount < 0}
                  value={signedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未签到人数"
                  loading={statisticReadyState !== 1 || noSignedCount < 0}
                  value={noSignedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总人数"
                  loading={
                    statisticReadyState !== 1 || signedCount + noSignedCount < 0
                  }
                  value={signedCount + noSignedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="签到进度"
                  loading={
                    statisticReadyState !== 1 || signedCount + noSignedCount < 0
                  }
                  value={
                    (signedCount / (signedCount + noSignedCount)) * 100 || 0
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
                  loading={statisticReadyState !== 1 || interviewedCount < 0}
                  value={interviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未面试人数"
                  loading={statisticReadyState !== 1 || noInterviewedCount < 0}
                  value={noInterviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="面试进度"
                  loading={
                    statisticReadyState !== 1 ||
                    interviewedCount + noInterviewedCount < 0
                  }
                  value={
                    (interviewedCount /
                      (interviewedCount + noInterviewedCount)) *
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
            columns={studentSignColumns}
            rowKey={record => record.id_card}
            loading={statisticReadyState !== 1}
            dataSource={students}
            pagination={{
              defaultPageSize: 20,
              showQuickJumper: true,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

const ManageProvider: FC = () => {
  const auth = useRecoilValue(authStateSelector);
  const { message } = AntdApp.useApp();
  useMount(() => {
    if (!auth.token) {
      message.error('请先认证！');
    } else if (auth.permission !== 'MANAGE') {
      message.error('权限不足！');
    }
  });
  return auth.token && auth.permission === 'MANAGE' ? (
    <Manage />
  ) : (
    <Navigate to="/" />
  );
};

export default ManageProvider;

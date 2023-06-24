import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
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
import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import HeadTitle from '../../components/HeadTitle';
import { authStateSelector } from '../../selectors/auth';
import {
  studentOverviewService,
  studentStatisticService,
} from '../../services/student';
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
  return <Badge status="default" text="未报名" />;
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
          <CheckOutlined />
        </Typography.Text>
      ) : (
        <Typography.Text type="danger">
          <CloseOutlined />
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
  // 统计人数
  const [count, setCount] = useState({
    signedCount: 0,
    noSignedCount: 0,
    interviewedCount: 0,
    noInterviewedCount: 0,
  });
  // 获取统计信息
  const { loading: statisticLoading } = useRequest(studentStatisticService, {
    pollingInterval: 5000,
    loadingDelay: 300,
    onSuccess({ data }) {
      setCount({ ...data });
    },
  });
  // 获取学生总览
  const { loading: overviewLoading } = useRequest(studentOverviewService, {
    pollingInterval: 5000,
    loadingDelay: 300,
    onSuccess(res) {
      setStudents(res.data);
    },
  });
  const [students, setStudents] = useState<Student[]>([]);
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
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={count.signedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未签到人数"
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={count.noSignedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="总人数"
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={count.noSignedCount + count.signedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="签到进度"
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={
                    (count.signedCount /
                      (count.signedCount + count.noSignedCount)) *
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
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={count.interviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未面试人数"
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={count.noInterviewedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="面试进度"
                  loading={
                    count.signedCount + count.noSignedCount < 1 ||
                    statisticLoading
                  }
                  value={
                    (count.interviewedCount /
                      (count.interviewedCount + count.noInterviewedCount)) *
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
            loading={!students.length || overviewLoading}
            dataSource={students}
          />
        </Col>
      </Row>
    </>
  );
};

const ManageProvider: FC = () => {
  const auth = useRecoilValue(authStateSelector);
  const { message } = AntdApp.useApp();
  useEffect(() => {
    if (!auth.token) {
      message.error('请先认证！');
    } else if (auth.permission !== 'MANAGE') {
      message.error('权限不足！');
    }
  }, []);
  return auth.token && auth.permission === 'MANAGE' ? (
    <Manage />
  ) : (
    <Navigate to="/" />
  );
};

export default ManageProvider;

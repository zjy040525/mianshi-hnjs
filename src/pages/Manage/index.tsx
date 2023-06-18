import {
  CheckOutlined,
  CloseOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
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
import { permissionStateAtom, tokenStateAtom } from '../../atoms/auth';
import HeadTitle from '../../components/HeadTitle';
import {
  studentOverviewService,
  studentStatisticService,
} from '../../services/student';
import type { InterviewStatus, Student } from '../../types/student';

const renderBadge = (type: InterviewStatus) => {
  switch (type) {
    case 'Processing':
      return <Badge status="processing" text="进行中" />;
    case 'Failed':
      return <Badge status="error" text="面试未通过" />;
    case 'Success':
      return <Badge status="success" text="面试已通过" />;
  }
  return '-';
};

const studentSignColumns: ColumnsType<Student> = [
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
    title: '学前',
    dataIndex: 'xq',
    render: value => renderBadge(value),
  },
  {
    title: '旅游',
    dataIndex: 'ly',
    render: value => renderBadge(value),
  },
  {
    title: '轨道',
    dataIndex: 'gd',
    render: value => renderBadge(value),
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
    title: '更新时间',
    dataIndex: 'updated_at',
    render(dateTime) {
      return dayjs(dateTime).format('YYYY-MM-DD HH:mm:ss');
    },
  },
];

const Manage: FC = () => {
  // 签到人数
  const [signedCount, setSignedCount] = useState(0);
  // 未签到人数
  const [noSignedCount, setNoSignedCount] = useState(0);
  // 获取统计信息
  const { loading: statisticLoading } = useRequest(studentStatisticService, {
    pollingInterval: 5000,
    loadingDelay: 300,
    onSuccess(res) {
      setSignedCount(res.data.signedCount);
      setNoSignedCount(res.data.noSignedCount);
    },
  });
  // 获取同学信息总览
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
            <Col span={7}>
              <Card>
                <Statistic
                  title="已签到人数"
                  loading={statisticLoading}
                  value={signedCount}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<UserAddOutlined />}
                />
              </Card>
            </Col>
            <Col span={7}>
              <Card>
                <Statistic
                  title="未签到人数"
                  loading={statisticLoading}
                  value={noSignedCount}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<UserDeleteOutlined />}
                />
              </Card>
            </Col>
            <Col span={10}>
              <Card>
                <Statistic
                  title="总人数"
                  value={noSignedCount + signedCount}
                  prefix={<TeamOutlined />}
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
            loading={overviewLoading}
            dataSource={students}
          />
        </Col>
      </Row>
    </>
  );
};

const ManageProvider: FC = () => {
  const token = useRecoilValue(tokenStateAtom);
  const permission = useRecoilValue(permissionStateAtom);
  const { message } = AntdApp.useApp();
  useEffect(() => {
    if (!token) {
      message.error('请先认证！');
    } else if (permission !== 102) {
      message.error('权限不足！');
    }
  }, []);
  return token && permission === 102 ? <Manage /> : <Navigate to="/" />;
};

export default ManageProvider;

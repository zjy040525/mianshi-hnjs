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
import { ColumnFilterItem } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tokenStateAtom } from '../../atoms/authorization';
import { newMsgNotificationOfAdmin } from '../../atoms/manage';
import HeadTitle from '../../components/HeadTitle';
import { authorizationStateSelector } from '../../selectors/authorization';
import { operationSocket, statisticSocket } from '../../services/socket';
import type { InterviewStatus, Student } from '../../types/student';

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
      render: value => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        return record.interview_xq === (value === false ? null : value);
      },
    },
    {
      title: '旅游面试进度',
      dataIndex: 'interview_ly',
      render: value => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        return record.interview_ly === (value === false ? null : value);
      },
    },
    {
      title: '轨道面试进度',
      dataIndex: 'interview_gd',
      render: value => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '-', value: false },
      ],
      onFilter(value, record) {
        return record.interview_gd === (value === false ? null : value);
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
  const { disconnect: operationDisconnect, connect: operationConnect } =
    useWebSocket(operationSocket(), {
      manual: true,
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
  const newMsgNotification = useRecoilValue(newMsgNotificationOfAdmin);
  // 只有在`新消息通知`为启用状态下，才会连接到对应的socket
  useMount(() => {
    if (newMsgNotification) {
      operationConnect();
    }
  });
  // 统计信息套接字
  const { disconnect: statisticDisconnect, readyState: statisticReadyState } =
    useWebSocket(statisticSocket(), {
      onMessage(ev) {
        const { counts, students } = JSON.parse(ev.data);

        setCounts(counts);
        setStudents(students);
        // 设置可筛选过滤的条件
        const map = new Map<number, string>();
        const map2 = new Map<number, string>();
        // 遍历去重
        for (const student of students as Student[]) {
          if (student.signed_operator && !map.has(student.signed_operator.id)) {
            map.set(
              student.signed_operator.id,
              student.signed_operator.nickname ??
                student.signed_operator.username
            );
          }
          if (
            student.interviewed_operator &&
            !map2.has(student.interviewed_operator.id)
          ) {
            map2.set(
              student.interviewed_operator.id,
              student.interviewed_operator.nickname ??
                student.interviewed_operator.username
            );
          }
        }
        // 可过滤列表
        const signedOperatorFilters = [...map]
          .map(([value, text]) => ({ text, value }))
          .sort((a, b) => a.value - b.value);
        const interviewedOperatorFilters = [...map2]
          .map(([value, text]) => ({ text, value }))
          .sort((a, b) => a.value - b.value);
        // 设置可过滤列表
        setSignedOperatorFilters(signedOperatorFilters);
        setInterviewedOperatorFilters(interviewedOperatorFilters);
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
            columns={columns}
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

/**
 * 是否通过面试的显示微标
 *
 * @param type 通过状态
 * @author Jia-Yao Zhao
 */
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

/**
 * 检查`管理`页面是否可以访问
 *
 * @author Jia-Yao Zhao
 */
const CheckManage: FC = () => {
  const authorization = useRecoilValue(authorizationStateSelector);
  const { message } = AntdApp.useApp();
  useMount(() => {
    if (!authorization.token) {
      message.error('请先认证！');
    } else if (authorization.permission !== 'MANAGE') {
      message.error('权限不足！');
    }
  });
  return authorization.token && authorization.permission === 'MANAGE' ? (
    <Manage />
  ) : (
    <Navigate to="/" />
  );
};

export default CheckManage;

import { adminNewMsgNotification, tokenStateAtom } from '@/atoms';
import { Access, HeadTitle } from '@/components';
import { studentSocket, userSocket } from '@/services';
import type { Student } from '@/typings';
import { useMount, useUnmount, useWebSocket } from 'ahooks';
import { App as AntdApp, Badge, Card, Col, Row, Statistic, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnFilterItem } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { badge } from './components';
import { filterUser } from './utils';

/**
 * 学生管理组件
 *
 * @author Jia-Yao Zhao
 */
const ManageStudent: FC = () => {
  // 筛选过滤条件
  const [signedUserFilters, setSignedUserFilters] = useState<
    ColumnFilterItem[]
  >([]);
  const [interviewedUserFilters, setInterviewedUserFilters] = useState<
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
      dataIndex: 'idCard',
    },
    {
      title: '初中学校',
      dataIndex: 'graduatedSchool',
    },
    {
      title: '手机号',
      dataIndex: 'telephoneNumber',
    },
    {
      title: '中考报名序号',
      dataIndex: 'registrationNumber',
    },
    {
      title: '签到状态',
      dataIndex: 'signStatus',
      render(value) {
        return value ? (
          <Badge status="success" text="已签到" />
        ) : (
          <Badge status="error" text="未签到" />
        );
      },
      sorter: (a, b) => Number(a.signStatus) - Number(b.signStatus),
    },
    {
      title: '签到时间',
      dataIndex: 'signedDate',
      render(value) {
        if (value) {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
        return '-';
      },
      sorter: (a, b) =>
        (a.signedDate ? Date.parse(a.signedDate) : 0) -
        (b.signedDate ? Date.parse(b.signedDate) : 0),
    },
    {
      title: '签到管理员',
      dataIndex: 'signedUser',
      render(value) {
        if (value) {
          return value.nickname || value.username;
        }
        return '-';
      },
      filters: signedUserFilters,
      onFilter(value, record) {
        return record.signedUserId === value;
      },
    },
    {
      title: '城轨面试进度',
      dataIndex: 'urbanRailTransitInterview',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '未报名', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.urbanRailTransitInterview === value;
        }
        return record.urbanRailTransitInterview === null;
      },
    },
    {
      title: '旅游面试进度',
      dataIndex: 'tourismManagementInterview',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '未报名', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.tourismManagementInterview === value;
        }
        return record.tourismManagementInterview === null;
      },
    },
    {
      title: '学前面试进度',
      dataIndex: 'earlyChildhoodEducationInterview',
      render: (value) => badge(value),
      filters: [
        { text: '已通过', value: 'Success' },
        { text: '未通过', value: 'Failed' },
        { text: '进行中', value: 'Processing' },
        { text: '未报名', value: false },
      ],
      onFilter(value, record) {
        if (value) {
          return record.earlyChildhoodEducationInterview === value;
        }
        return record.earlyChildhoodEducationInterview === null;
      },
    },
    {
      title: '面试时间',
      dataIndex: 'interviewedDate',
      render(value) {
        if (value) {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        }
        return '-';
      },
      sorter: (a, b) =>
        (a.interviewedDate ? Date.parse(a.interviewedDate) : 0) -
        (b.interviewedDate ? Date.parse(b.interviewedDate) : 0),
    },
    {
      title: '面试管理员',
      dataIndex: 'interviewedUser',
      render(value) {
        if (value) {
          return value.nickname || value.username;
        }
        return '-';
      },
      filters: interviewedUserFilters,
      onFilter(value, record) {
        return record.interviewedUserId === value;
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
  // 接收不同用户操作的即时信息
  const userWs = useWebSocket(userSocket(), {
    // 需要手动连接
    manual: true,
    // 关闭重连
    reconnectLimit: 0,
    onOpen(_event, instance) {
      // 连接成功后发送token进行验证
      instance.send(JSON.stringify({ token }));
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
      userWs.connect();
    }
  });
  // 统计信息socket
  const studentWs = useWebSocket(studentSocket(), {
    // 关闭重连
    reconnectLimit: 0,
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
        countList: typeof counts;
        studentList: Student[];
      } = data;
      // 更新数据
      setCounts(values.countList);
      setStudents(values.studentList);
      // 设置可筛选过滤的条件
      setSignedUserFilters(
        filterUser(values.studentList, 'signedUser', 'signedUserId'),
      );
      setInterviewedUserFilters(
        filterUser(values.studentList, 'interviewedUser', 'interviewedUserId'),
      );
    },
  });
  // 组件卸载，需要断开WebSocket的连接
  useUnmount(() => {
    userWs.disconnect();
    studentWs.disconnect();
  });
  return (
    <Access role="admin-all">
      <HeadTitle titles={['学生管理']} />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="已签到人数"
                  loading={studentWs.readyState !== 1 || counts.signedCount < 0}
                  value={counts.signedCount}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="未签到人数"
                  loading={
                    studentWs.readyState !== 1 || counts.noSignedCount < 0
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
                    studentWs.readyState !== 1 ||
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
                    studentWs.readyState !== 1 ||
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
                    studentWs.readyState !== 1 || counts.interviewedCount < 0
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
                    studentWs.readyState !== 1 || counts.noInterviewedCount < 0
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
                    studentWs.readyState !== 1 ||
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
            rowKey={(record) => record.idCard}
            loading={studentWs.readyState !== 1}
            dataSource={students}
          />
        </Col>
      </Row>
    </Access>
  );
};

export default ManageStudent;

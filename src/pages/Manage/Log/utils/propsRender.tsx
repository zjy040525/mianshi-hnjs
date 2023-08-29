import { InterviewTag } from '@/components';
import type { Log } from '@/typings';
import { datetimeFormat } from '@/utils';
import {
  FileTextOutlined,
  LoginOutlined,
  PrinterOutlined,
  RightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Space, Typography } from 'antd';

export const propsRender = (log: Log) => {
  switch (log.recordType) {
    case 'Auth':
      return {
        dot: <UserOutlined />,
        children: (
          <Space size={4}>
            <Typography.Text style={{ paddingInlineEnd: 12 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>
            <Typography.Text>
              <RightOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">登录系统</Typography.Text>
          </Space>
        ),
      };
    case 'Sign':
      return {
        dot: <LoginOutlined />,
        children: (
          <Space size={4}>
            <Typography.Text style={{ paddingInlineEnd: 12 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>
            <Typography.Text>
              <RightOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">学生签到</Typography.Text>
            <Typography.Text>
              <RightOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordStudent?.name}（{log.recordStudent?.idCard}）
            </Typography.Text>
          </Space>
        ),
      };
    case 'Print':
      return {
        dot: <PrinterOutlined />,
        children: (
          <Space size={4}>
            <Typography.Text style={{ paddingInlineEnd: 12 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>
            <Typography.Text>
              <RightOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">资料打印</Typography.Text>
            <Typography.Text>
              <RightOutlined />
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordStudent?.name}#{log.recordStudent?.id}
            </Typography.Text>
          </Space>
        ),
      };
    case 'Interview':
      return {
        dot: <FileTextOutlined />,
        children: (
          <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
            <Space size={4}>
              <Typography.Text style={{ paddingInlineEnd: 12 }}>
                {datetimeFormat(log.recordDate)}
              </Typography.Text>
              <Typography.Text type="secondary">
                {log.recordUser?.nickname || log.recordUser?.username}
              </Typography.Text>
              <Typography.Text>
                <RightOutlined />
              </Typography.Text>
              <Typography.Text type="secondary">学生面试</Typography.Text>
              <Typography.Text>
                <RightOutlined />
              </Typography.Text>
              <Typography.Text type="secondary">
                {log.recordStudent?.name}#{log.recordStudent?.id}
              </Typography.Text>
            </Space>
            {log.recordStudent ? (
              <div>
                <InterviewTag
                  showNull
                  status={log.recordStudent.urbanRailTransitInterview}
                  text="城轨"
                />
                <InterviewTag
                  showNull
                  status={log.recordStudent.tourismManagementInterview}
                  text="旅游"
                />
                <InterviewTag
                  showNull
                  status={log.recordStudent.earlyChildhoodEducationInterview}
                  text="学前"
                />
              </div>
            ) : null}
          </div>
        ),
      };
  }
};

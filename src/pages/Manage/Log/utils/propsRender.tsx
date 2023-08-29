import { InterviewTag } from '@/components';
import type { Log } from '@/typings';
import { datetimeFormat } from '@/utils';
import { Typography } from 'antd';

export const propsRender = (log: Log) => {
  switch (log.recordType) {
    case 'Auth':
      return {
        children: (
          <>
            <Typography.Text style={{ paddingInlineEnd: 16 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>{' '}
            <Typography.Text>登录系统</Typography.Text>
          </>
        ),
      };
    case 'Sign':
      return {
        children: (
          <>
            <Typography.Text style={{ paddingInlineEnd: 16 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordStudent?.name}（{log.recordStudent?.idCard}）
            </Typography.Text>{' '}
            <Typography.Text>在</Typography.Text>{' '}
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>{' '}
            <Typography.Text>完成签到</Typography.Text>
          </>
        ),
      };
    case 'Print':
      return {
        children: (
          <>
            <Typography.Text style={{ paddingInlineEnd: 16 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordStudent?.name}#{log.recordStudent?.id}
            </Typography.Text>{' '}
            <Typography.Text>在</Typography.Text>{' '}
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>{' '}
            <Typography.Text>完成打印</Typography.Text>
          </>
        ),
      };
    case 'Interview':
      return {
        children: (
          <>
            <Typography.Text style={{ paddingInlineEnd: 16 }}>
              {datetimeFormat(log.recordDate)}
            </Typography.Text>
            <Typography.Text type="secondary">
              {log.recordStudent?.name}#{log.recordStudent?.id}
            </Typography.Text>{' '}
            <Typography.Text>在</Typography.Text>{' '}
            <Typography.Text type="secondary">
              {log.recordUser?.nickname || log.recordUser?.username}
            </Typography.Text>{' '}
            <Typography.Text>完成面试</Typography.Text>
            {log.recordStudent ? (
              <span style={{ paddingInlineStart: 8 }}>
                <InterviewTag
                  status={log.recordUrbanRailTransitInterview}
                  text="城轨"
                  showNull
                />
                <InterviewTag
                  status={log.recordTourismManagementInterview}
                  text="旅游"
                  showNull
                />
                <InterviewTag
                  status={log.recordEarlyChildhoodEducationInterview}
                  text="学前"
                  showNull
                />
              </span>
            ) : null}
          </>
        ),
      };
  }
};

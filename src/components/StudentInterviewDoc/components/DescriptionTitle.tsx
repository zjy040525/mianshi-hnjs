import type { Student } from '@/typings';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';

export const DescriptionTitle: FC<{ student: Student }> = ({ student }) => {
  return (
    <>
      <Typography.Title style={{ textAlign: 'center' }}>
        {import.meta.env.VITE_DOCUMENT_NAME}
      </Typography.Title>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={4} style={{ margin: 0 }}>
          报到时间：
          {dayjs(student.signed_date).format('YYYY-MM-DD HH:mm:ss')}
        </Typography.Title>
        <Typography.Title level={4} style={{ margin: 0 }}>
          系统序号：{student.id}
        </Typography.Title>
      </div>
    </>
  );
};

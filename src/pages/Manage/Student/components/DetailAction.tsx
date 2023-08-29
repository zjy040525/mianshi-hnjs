import { InterviewTag } from '@/components';
import type { Student } from '@/typings';
import { datetimeFormat } from '@/utils';
import { Badge, Descriptions, Divider, Drawer, Typography } from 'antd';
import dayjs from 'dayjs/esm';
import { useState, type FC } from 'react';

export const DetailAction: FC<{ student: Student }> = ({ student }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Typography.Link onClick={() => setOpen(true)}>查看</Typography.Link>
      <Drawer
        title="学生详情"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Descriptions
          items={[
            {
              label: '序号',
              children: student.id,
              span: 3,
            },
            {
              label: '姓名',
              children: student.name,
              span: 3,
            },
            {
              label: '性别',
              children: student.gender,
              span: 3,
            },
            {
              label: '身份证号码',
              children: student.idCard,
              span: 3,
            },
            {
              label: '初中学校',
              children: student.graduatedSchool,
              span: 3,
            },
            {
              label: '中考报名序号',
              children: student.registrationNumber,
              span: 3,
              style: {
                paddingBlockEnd: 0,
              },
            },
          ]}
        />
        <Divider />
        <Descriptions
          items={[
            {
              label: '签到状态',
              children: student.signStatus ? (
                <Badge status="success" text="已签到" />
              ) : (
                <Badge status="error" text="未签到" />
              ),
              span: 3,
            },
            {
              label: '签到时间',
              children: student.signedDate
                ? `${datetimeFormat(student.signedDate)}（${dayjs(
                    student.signedDate,
                  ).fromNow()}）`
                : '-',
              span: 3,
            },
            {
              label: '执行人',
              children: student.signedUserId
                ? student.signedUser?.nickname || student.signedUser?.username
                : '-',
              span: 3,
            },
            {
              label: '执行人编号',
              children: student.signedUserId || '-',
              span: 3,
              style: {
                paddingBlockEnd: 0,
              },
            },
          ]}
        />
        <Divider />
        <Descriptions
          items={[
            {
              label: '面试专业',
              children: (
                <>
                  <InterviewTag
                    showNull
                    status={student.urbanRailTransitInterview}
                    text="城轨"
                  />
                  <InterviewTag
                    showNull
                    status={student.tourismManagementInterview}
                    text="旅游"
                  />
                  <InterviewTag
                    showNull
                    status={student.earlyChildhoodEducationInterview}
                    text="学前"
                  />
                </>
              ),
              span: 3,
            },
            {
              label: '面试时间',
              children: student.interviewedDate
                ? `${datetimeFormat(student.interviewedDate)}（${dayjs(
                    student.interviewedDate,
                  ).fromNow()}）`
                : '-',
              span: 3,
            },
            {
              label: '执行人',
              children: student.interviewedUserId
                ? student.interviewedUser?.nickname ||
                  student.interviewedUser?.username
                : '-',
              span: 3,
            },
            {
              label: '执行人编号',
              children: student.interviewedUserId || '-',
              span: 3,
              style: {
                paddingBlockEnd: 0,
              },
            },
          ]}
        />
      </Drawer>
    </>
  );
};

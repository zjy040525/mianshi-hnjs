import { Descriptions, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Student } from '../../types/student';
import classes from './index.module.less';

const BasicPrint: FC<{ chosenStudent: Student | null }> = ({
  chosenStudent,
}) => {
  return (
    <Descriptions
      style={{ marginBlockEnd: 50 }}
      title={
        <>
          <Typography.Title style={{ textAlign: 'center' }}>
            2023年海宁技师学院招生面试单
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
              {dayjs(chosenStudent?.updated_at).format('YYYY-MM-DD')}
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              报道序号：{chosenStudent?.id}
            </Typography.Title>
          </div>
        </>
      }
      bordered
    >
      <Descriptions.Item label="考生姓名" span={3}>
        {chosenStudent?.name}
      </Descriptions.Item>
      <Descriptions.Item label="身份证号" span={3}>
        {chosenStudent?.id_card}
      </Descriptions.Item>
      <Descriptions.Item label="性别" span={3}>
        {chosenStudent?.gender}
      </Descriptions.Item>
      <Descriptions.Item label="初中就读学校" span={3}>
        {chosenStudent?.graduated_school}
      </Descriptions.Item>
      <Descriptions.Item
        span={1}
        label={
          <>
            <div className={classes.space}>面试专业一</div>
            <div className={classes.space}>面试专业二</div>
            <div>面试专业三</div>
          </>
        }
      >
        {[
          chosenStudent?.gd
            ? { weight: 3, element: '城市轨道交通运输与管理' }
            : { weight: 0, element: '-' },
          chosenStudent?.ly
            ? { weight: 2, element: '旅游服务与管理' }
            : { weight: 0, element: '-' },
          chosenStudent?.xq
            ? { weight: 1, element: '幼儿教育' }
            : { weight: 0, element: '-' },
        ]
          .sort((a, b) => b.weight - a.weight)
          .map((value, index, array) => {
            return (
              <div
                key={index}
                className={index < array.length - 1 ? classes.space : undefined}
              >
                {value.element}
              </div>
            );
          })}
      </Descriptions.Item>
      <Descriptions.Item label="面试盖章" span={1}>
        <div className={classes.signPlaced}></div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicPrint;

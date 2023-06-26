import { Descriptions, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import type { Student } from '../../types/student';
import classes from './index.module.less';

const BasicPrint: FC<{ chosenStudent: Student }> = ({ chosenStudent }) => {
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
              {dayjs(chosenStudent.signed_date).format('YYYY-MM-DD HH:mm:ss')}
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              系统序号：{chosenStudent.id}
            </Typography.Title>
          </div>
        </>
      }
      bordered
    >
      <Descriptions.Item label="考生姓名">
        {chosenStudent.name}
      </Descriptions.Item>
      <Descriptions.Item label="身份证号">
        {chosenStudent.id_card}
      </Descriptions.Item>
      <Descriptions.Item label="性别">{chosenStudent.gender}</Descriptions.Item>
      <Descriptions.Item label="初中就读学校">
        {chosenStudent.graduated_school}
      </Descriptions.Item>
      <Descriptions.Item
        label={
          <>
            <div className={classes.space}>面试专业一</div>
            <div className={classes.space}>面试专业二</div>
            <div>面试专业三</div>
          </>
        }
      >
        {[
          chosenStudent.interview_gd
            ? { weight: 3, element: '城市轨道交通运输与管理' }
            : { weight: 0, element: '-' },
          chosenStudent.interview_ly
            ? { weight: 2, element: '旅游服务与管理' }
            : { weight: 0, element: '-' },
          chosenStudent.interview_xq
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
      <Descriptions.Item label="面试盖章">
        <div className={classes.signPlaced}></div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicPrint;

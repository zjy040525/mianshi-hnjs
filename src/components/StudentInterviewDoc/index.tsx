import type { Student } from '@/typings';
import {
  BorderOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Descriptions, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import classes from './index.module.less';

export const StudentInterviewDoc: FC<{ student: Student }> = ({ student }) => {
  return (
    <>
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
                {dayjs(student.signed_date).format('YYYY-MM-DD HH:mm:ss')}
              </Typography.Title>
              <Typography.Title level={4} style={{ margin: 0 }}>
                系统序号：{student.id}
              </Typography.Title>
            </div>
          </>
        }
        bordered
      >
        <Descriptions.Item label="考生姓名">{student.name}</Descriptions.Item>
        <Descriptions.Item label="身份证号">
          {student.id_card}
        </Descriptions.Item>
        <Descriptions.Item label="性别">{student.gender}</Descriptions.Item>
        <Descriptions.Item label="初中就读学校">
          {student.graduated_school}
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
            student.interview_gd
              ? { weight: 3, element: '城市轨道交通运输与管理' }
              : { weight: 0, element: '-' },
            student.interview_ly
              ? { weight: 2, element: '旅游服务与管理' }
              : { weight: 0, element: '-' },
            student.interview_xq
              ? { weight: 1, element: '幼儿教育' }
              : { weight: 0, element: '-' },
          ]
            .sort((a, b) => b.weight - a.weight)
            .map((value, index, array) => {
              return (
                <div
                  key={index}
                  className={
                    index < array.length - 1 ? classes.space : undefined
                  }
                >
                  {value.element}
                </div>
              );
            })}
        </Descriptions.Item>
        <Descriptions.Item label="面试盖章">{''}</Descriptions.Item>
      </Descriptions>
      {student.interview_gd ? (
        <Descriptions
          style={{ marginBlockEnd: 50 }}
          title={
            <Typography.Title
              style={{ textAlign: 'center', marginBlockEnd: 0 }}
            >
              城市轨道交通运输与管理
            </Typography.Title>
          }
          bordered
        >
          <Descriptions.Item label="考生姓名">{student.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{student.gender}</Descriptions.Item>
          <Descriptions.Item label="身份证号码">
            {student.id_card}
          </Descriptions.Item>
          <Descriptions.Item label="初中就读学校">
            {student.graduated_school}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            <Space size={16}>
              <Space>
                <BorderOutlined />
                身高
              </Space>
              <Space>
                <BorderOutlined />
                纹身
              </Space>
              <Space>
                <BorderOutlined />
                头发
              </Space>
              <Space>
                <BorderOutlined />
                身体残疾
              </Space>
              <Space>
                <BorderOutlined />
                其他________
              </Space>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div style={{ textAlign: 'center' }}>
                <div>面试结果</div>
                <div>
                  （通过打
                  <CheckOutlined />
                  ，不通过打
                  <CloseOutlined />）
                </div>
              </div>
            }
          >
            {''}
          </Descriptions.Item>
          <Descriptions.Item label="教师签名">{''}</Descriptions.Item>
        </Descriptions>
      ) : null}
      {student.interview_ly ? (
        <Descriptions
          style={{ marginBlockEnd: 50 }}
          title={
            <Typography.Title
              style={{ textAlign: 'center', marginBlockEnd: 0 }}
            >
              旅游服务与管理
            </Typography.Title>
          }
          bordered
        >
          <Descriptions.Item label="考生姓名">{student.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{student.gender}</Descriptions.Item>
          <Descriptions.Item label="身份证号码">
            {student.id_card}
          </Descriptions.Item>
          <Descriptions.Item label="初中就读学校">
            {student.graduated_school}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            <Space size={16}>
              <Space>
                <BorderOutlined />
                身高
              </Space>
              <Space>
                <BorderOutlined />
                纹身
              </Space>
              <Space>
                <BorderOutlined />
                头发
              </Space>
              <Space>
                <BorderOutlined />
                身体残疾
              </Space>
              <Space>
                <BorderOutlined />
                其他________
              </Space>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div style={{ textAlign: 'center' }}>
                <div>面试结果</div>
                <div>
                  （通过打
                  <CheckOutlined />
                  ，不通过打
                  <CloseOutlined />）
                </div>
              </div>
            }
          >
            {''}
          </Descriptions.Item>
          <Descriptions.Item label="教师签名">
            <div style={{ paddingInlineEnd: 60 }}></div>
          </Descriptions.Item>
        </Descriptions>
      ) : null}
      {student.interview_xq ? (
        <Descriptions
          style={{ marginBlockEnd: 50 }}
          title={
            <Typography.Title
              style={{ textAlign: 'center', marginBlockEnd: 0 }}
            >
              幼儿教育
            </Typography.Title>
          }
          bordered
        >
          <Descriptions.Item label="考生姓名">{student.name}</Descriptions.Item>
          <Descriptions.Item label="性别">{student.gender}</Descriptions.Item>
          <Descriptions.Item label="身份证号码">
            {student.id_card}
          </Descriptions.Item>
          <Descriptions.Item label="初中就读学校">
            {student.graduated_school}
          </Descriptions.Item>
          <Descriptions.Item label="备注">
            <Space size={16}>
              <Space>
                <BorderOutlined />
                身高
              </Space>
              <Space>
                <BorderOutlined />
                纹身
              </Space>
              <Space>
                <BorderOutlined />
                头发
              </Space>
              <Space>
                <BorderOutlined />
                身体残疾
              </Space>
              <Space>
                <BorderOutlined />
                其他________
              </Space>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item
            label={
              <div style={{ textAlign: 'center' }}>
                <div>面试结果</div>
                <div>
                  （通过打
                  <CheckOutlined />
                  ，不通过打
                  <CloseOutlined />）
                </div>
              </div>
            }
          >
            {''}
          </Descriptions.Item>
          <Descriptions.Item label="教师签名">
            <div style={{ paddingInlineEnd: 60 }}></div>
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </>
  );
};

import { useRequest } from 'ahooks';
import {
  App as AntdApp,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Radio,
  Row,
  Select,
  Space,
  Spin,
  StepProps,
  Steps,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../../atoms/auth';
import HeadTitle from '../../components/HeadTitle';
import StudentDescriptions from '../../components/StudentDescriptions';
import { SEARCH_STUDENT_KEY, STUDENT_INTERVIEW_KEY } from '../../constant/msg';
import {
  studentInterviewSearchService,
  studentInterviewService,
} from '../../services/student';
import type { InterviewStatus, Student } from '../../types/student';

const InterviewStatusTypeTag: FC<{
  status: InterviewStatus;
  text: string;
}> = ({ status, text }) => {
  switch (status) {
    case 'Processing':
      return <Tag color="processing">{text}</Tag>;
    case 'Success':
      return <Tag color="success">{text}</Tag>;
    case 'Failed':
      return <Tag color="error">{text}</Tag>;
    default:
      return null;
  }
};

const InterviewStatusTypeBadge: FC<{ status: InterviewStatus }> = ({
  status,
}) => {
  switch (status) {
    case 'Processing':
      return <Badge status="processing" text="未面试（进行中）" />;
    case 'Success':
      return <Badge status="success" text="通过" />;
    case 'Failed':
      return <Badge status="error" text="不通过" />;
    default:
      return null;
  }
};

const Interview: FC = () => {
  const { message } = AntdApp.useApp();
  // 步骤分段
  const [STEP_1, STEP_2, STEP_3, STEP_4] = [0, 1, 2, 3];
  // 当前步骤
  const [currentStep, setCurrentStep] = useState(0);
  // 选择的学生
  const [chosenStudent, setChosenStudent] = useState<Student | null>(null);
  // 搜索学生
  const [students, setStudents] = useState<Student[]>([]);
  // 步骤列表
  const steps: StepProps[] = [
    {
      title: '搜索',
      description: '使用报道序号搜索',
    },
    {
      title: '打分',
      description: '进行面试成绩打分',
    },
    {
      title: '检查',
      description: '确认无误后提交结果',
    },
  ];
  // 打分，默认状态为：面试进行中
  const [xq, setXq] = useState<InterviewStatus>(null);
  const [ly, setLy] = useState<InterviewStatus>(null);
  const [gd, setGd] = useState<InterviewStatus>(null);
  // 搜索服务
  const { run: runSearch, loading: searching } = useRequest(
    studentInterviewSearchService,
    {
      manual: true,
      throttleWait: 500,
      onSuccess({ data }) {
        setStudents(data);
        message.destroy(SEARCH_STUDENT_KEY);
      },
      onError(err) {
        message.open({
          key: SEARCH_STUDENT_KEY,
          type: 'error',
          content: err.message,
        });
      },
    }
  );
  // 面试打分服务
  const { run: runInterview, loading: interviewing } = useRequest(
    studentInterviewService,
    {
      manual: true,
      onBefore() {
        message.open({
          key: STUDENT_INTERVIEW_KEY,
          type: 'loading',
          content: '操作中…',
          duration: 0,
        });
      },
      onSuccess(res) {
        setChosenStudent(res.data);
        setCurrentStep(currentStep + 1);
        message.open({
          key: STUDENT_INTERVIEW_KEY,
          type: 'success',
          content: res.message,
        });
      },
      onError(err) {
        message.open({
          key: STUDENT_INTERVIEW_KEY,
          type: 'error',
          content: err.message,
        });
      },
    }
  );
  return (
    <>
      <HeadTitle titles={['面试']} />
      <Card>
        <Steps
          items={steps}
          current={currentStep}
          style={{ marginBlockEnd: 50 }}
        />
        <Row gutter={[16, 24]} justify="center">
          {currentStep === STEP_1 ? (
            <Col span={8}>
              <Select
                style={{ width: '100%' }}
                autoFocus
                showSearch
                allowClear
                filterOption={false}
                showArrow={false}
                placeholder="输入报道序号进行搜索"
                notFoundContent={
                  searching ? (
                    <Spin style={{ padding: 16 }} />
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description=""
                    />
                  )
                }
                value={chosenStudent?.id}
                onClear={() => {
                  setXq(null);
                  setLy(null);
                  setGd(null);
                  setChosenStudent(null);
                }}
                onSelect={(_value, { student }) => {
                  setXq(student.xq);
                  setLy(student.ly);
                  setGd(student.gd);
                  setChosenStudent(student);
                }}
                onSearch={studentId => {
                  if (studentId) {
                    runSearch(studentId);
                  }
                }}
                options={students.map(student => {
                  return {
                    value: student.id,
                    label: (
                      <Typography.Text
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: 'inherit',
                        }}
                      >
                        <InterviewStatusTypeTag
                          status={student.xq}
                          text="学前"
                        />
                        <InterviewStatusTypeTag
                          status={student.ly}
                          text="旅游"
                        />
                        <InterviewStatusTypeTag
                          status={student.gd}
                          text="轨道"
                        />
                        {student.name}（{student.id}）
                      </Typography.Text>
                    ),
                    student,
                  };
                })}
              />
            </Col>
          ) : null}
          {currentStep > STEP_1 ? (
            <>
              <Col span={24}>
                <StudentDescriptions
                  chosenStudent={chosenStudent}
                  signStatus={
                    <Badge
                      status="success"
                      text={`已签到（${dayjs(chosenStudent?.updated_at).format(
                        'YYYY-MM-DD HH:mm:ss'
                      )}）`}
                    />
                  }
                />
              </Col>
              {[
                chosenStudent?.xq
                  ? {
                      weight: 3,
                      title: '幼儿教育',
                      state: [xq, setXq],
                    }
                  : null,
                chosenStudent?.ly
                  ? {
                      weight: 2,
                      title: '旅游服务与管理',
                      state: [ly, setLy],
                    }
                  : null,
                chosenStudent?.gd
                  ? {
                      weight: 1,
                      title: '城市轨道交通运输与管理',
                      state: [gd, setGd],
                    }
                  : null,
              ]
                .sort((a, b) => (b?.weight ?? 0) - (a?.weight ?? 0))
                .map((card, index) => {
                  if (card) {
                    const [status, setStatus] = card.state as [
                      InterviewStatus,
                      Dispatch<SetStateAction<InterviewStatus>>
                    ];

                    return (
                      <Col key={index} span={8}>
                        <Card type="inner" title={card.title}>
                          {currentStep > STEP_2 ? (
                            <Space size={16}>
                              <Typography.Text>面试结果</Typography.Text>
                              <InterviewStatusTypeBadge status={status} />
                            </Space>
                          ) : (
                            <Radio.Group
                              onChange={e => setStatus(e.target.value)}
                              value={status}
                            >
                              <Radio value="Success">通过</Radio>
                              <Radio value="Failed">不通过</Radio>
                              <Radio value="Processing">未面试（进行中）</Radio>
                            </Radio.Group>
                          )}
                        </Card>
                      </Col>
                    );
                  }
                })}
            </>
          ) : null}
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space size={16}>
              {chosenStudent && currentStep > STEP_1 && currentStep < STEP_4 ? (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={interviewing}
                >
                  上一步
                </Button>
              ) : null}
              {chosenStudent && currentStep === STEP_3 ? (
                <Button
                  type="primary"
                  disabled={!chosenStudent || interviewing}
                  loading={interviewing}
                  onClick={() => {
                    runInterview(chosenStudent.id, xq, ly, gd);
                  }}
                >
                  提交
                </Button>
              ) : currentStep > STEP_3 ? (
                <Button
                  type="primary"
                  disabled={interviewing}
                  onClick={() => {
                    setCurrentStep(0);
                    setStudents([]);
                    setChosenStudent(null);
                    setXq('Processing');
                    setLy('Processing');
                    setGd('Processing');
                  }}
                >
                  继续
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={!chosenStudent || interviewing}
                  onClick={() => {
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  下一步
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};

const InterviewProvider: FC = () => {
  const { message } = AntdApp.useApp();
  const tokenState = useRecoilValue(tokenStateAtom);
  const permissionState = useRecoilValue(permissionStateAtom);
  useEffect(() => {
    if (!tokenState) {
      message.error('请先认证！');
    } else if (permissionState !== 'INTERVIEW') {
      message.error('权限不足！');
    }
  }, []);
  return tokenState && permissionState === 'INTERVIEW' ? (
    <Interview />
  ) : (
    <Navigate to="/" />
  );
};

export default InterviewProvider;

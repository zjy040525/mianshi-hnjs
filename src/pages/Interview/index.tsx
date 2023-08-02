import { idStateAtom } from '@/atoms';
import { HeadTitle, PermissionGuard, StudentDescription } from '@/components';
import {
  studentInterviewSearchService,
  studentInterviewService,
} from '@/services';
import type { InterviewStatus, Student } from '@/typings';
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
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { InterviewBadge, InterviewTag } from './components';
import {
  STUDENT_INTERVIEW_KEY,
  STUDENT_INTERVIEW_SEARCH_KEY,
} from './constants';
import classes from './index.module.less';

/**
 * 学生面试打分组件
 *
 * @author Jia-Yao Zhao
 */
const Interview: FC = () => {
  const { message } = AntdApp.useApp();
  const idState = useRecoilValue(idStateAtom);
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
      description: '使用系统序号搜索',
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
  // 打分，首次打分的默认状态为 进行中
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
        message.destroy(STUDENT_INTERVIEW_SEARCH_KEY);
      },
      onError(err) {
        message.open({
          key: STUDENT_INTERVIEW_SEARCH_KEY,
          type: 'error',
          content: err.message,
        });
      },
    },
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
    },
  );
  return (
    <PermissionGuard permission="INTERVIEW">
      <HeadTitle titles={[chosenStudent?.name, '面试']} />
      <Card>
        <Steps
          items={steps}
          current={currentStep}
          style={{ marginBlockEnd: 50 }}
        />
        <Row gutter={[16, 24]} justify="center">
          {currentStep === STEP_1 ? (
            <Col xxl={8} xl={12} lg={16} md={20} sm={24} xs={24}>
              <Select
                style={{ width: '100%' }}
                autoFocus
                showSearch
                filterOption={false}
                placeholder="输入系统序号进行搜索"
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
                  setXq(student.interview_xq);
                  setLy(student.interview_ly);
                  setGd(student.interview_gd);
                  setChosenStudent(student);
                }}
                onSearch={(studentId) => {
                  if (studentId) {
                    runSearch(studentId);
                  }
                }}
                options={students.map((student) => {
                  return {
                    value: student.id,
                    disabled:
                      !!student.interviewed_operator &&
                      student.interviewed_operator.id !== idState,
                    label: (
                      <span className={classes.selectItem}>
                        <span style={{ marginInlineEnd: 8 }}>
                          {student.name}（{student.id}）
                        </span>
                        <InterviewTag
                          status={student.interview_xq}
                          text="学前"
                        />
                        <InterviewTag
                          status={student.interview_ly}
                          text="旅游"
                        />
                        <InterviewTag
                          status={student.interview_gd}
                          text="轨道"
                        />
                        {student.interviewed_operator ? (
                          <Tag
                            color={
                              student.interviewed_operator.id === idState
                                ? 'success'
                                : 'warning'
                            }
                          >
                            隶属于
                            <span style={{ paddingInlineStart: 8 }}>
                              {`${
                                student.interviewed_operator.nickname ??
                                student.interviewed_operator.username
                              }${
                                student.interviewed_operator.id === idState
                                  ? '（我）'
                                  : ''
                              }`}
                            </span>
                          </Tag>
                        ) : null}
                      </span>
                    ),
                    student,
                  };
                })}
              />
            </Col>
          ) : null}
          {chosenStudent && currentStep > STEP_1 ? (
            <>
              <Col span={24}>
                <StudentDescription
                  student={chosenStudent}
                  signStatus={
                    <Badge
                      status="success"
                      text={`已签到（${dayjs(chosenStudent.signed_date).format(
                        'YYYY-MM-DD HH:mm:ss',
                      )}）`}
                    />
                  }
                />
              </Col>
              {[
                chosenStudent.interview_xq
                  ? { weight: 3, title: '幼儿教育', state: [xq, setXq] }
                  : null,
                chosenStudent.interview_ly
                  ? { weight: 2, title: '旅游服务与管理', state: [ly, setLy] }
                  : null,
                chosenStudent.interview_gd
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
                      Dispatch<SetStateAction<InterviewStatus>>,
                    ];

                    return (
                      <Col key={index} span={8}>
                        <Card type="inner" title={card.title}>
                          {currentStep > STEP_2 ? (
                            <Space size={16}>
                              <Typography.Text>面试结果</Typography.Text>
                              <InterviewBadge status={status} />
                            </Space>
                          ) : (
                            <Radio.Group
                              onChange={(e) => setStatus(e.target.value)}
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
    </PermissionGuard>
  );
};

export default Interview;

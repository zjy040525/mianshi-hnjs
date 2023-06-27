import { useMount, useRequest } from 'ahooks';
import {
  App as AntdApp,
  Badge,
  Button,
  Card,
  Col,
  Empty,
  Row,
  Select,
  Space,
  Spin,
  StepProps,
  Steps,
  Tag,
} from 'antd';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { idStateAtom } from '../../atoms/auth';
import BasicPrint from '../../components/BasicPrint';
import GdPrint from '../../components/GdPrint';
import HeadTitle from '../../components/HeadTitle';
import LyPrint from '../../components/LyPrint';
import StudentDescriptions from '../../components/StudentDescriptions';
import XqPrint from '../../components/XqPrint';
import {
  PRINT_KEY,
  SEARCH_STUDENT_KEY,
  STUDENT_SIGN_KEY,
} from '../../constant/msg';
import { authStateSelector } from '../../selectors/auth';
import {
  studentPrintService,
  studentSignSearchService,
  studentSignService,
} from '../../services/student';
import type { Student } from '../../types/student';
import classes from './index.module.less';

// 步骤列表
const steps: StepProps[] = [
  {
    title: '搜索',
    description: '使用身份证号码搜索',
  },
  {
    title: '信息',
    description: '核实身份信息是否正确',
  },
  {
    title: '签到',
    description: '确认无误后进行签到',
  },
  {
    title: '打印',
    description: '签到完成后打印资料',
  },
];

/**
 * 学生签到流程组件
 *
 * @author Jia-Yao Zhao
 */
const SignIn: FC = () => {
  const { message } = AntdApp.useApp();
  const idState = useRecoilValue(idStateAtom);
  // 步骤分段
  const [STEP_1, STEP_2, STEP_3, STEP_4] = [0, 1, 2, 3];
  // 当前步骤
  const [currentStep, setCurrentStep] = useState(0);
  // 搜索学生
  const [students, setStudents] = useState<Student[]>([]);
  // 选择的学生
  const [chosenStudent, setChosenStudent] = useState<Student | null>(null);
  // 搜索学生服务
  const { run: runSearch, loading: searching } = useRequest(
    studentSignSearchService,
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
  // 为指定学生签到
  const { run: runSign, loading: signing } = useRequest(studentSignService, {
    manual: true,
    onBefore() {
      message.open({
        key: STUDENT_SIGN_KEY,
        type: 'loading',
        content: '签到中…',
        duration: 0,
      });
    },
    onSuccess(res) {
      // 更新指定学生签到信息的状态
      setChosenStudent(res.data);
      setCurrentStep(currentStep + 1);
      message.open({
        key: STUDENT_SIGN_KEY,
        type: 'success',
        content: res.message,
      });
    },
    onError(err) {
      message.open({
        key: STUDENT_SIGN_KEY,
        type: 'error',
        content: err.message,
      });
    },
  });
  // 打印模板的字符串结构
  const [printDoc, setPrintDoc] = useState<string | null>(null);
  // 获取打印模板
  const { run: runPrint, loading: printing } = useRequest(studentPrintService, {
    manual: true,
    onBefore() {
      message.open({
        key: PRINT_KEY,
        type: 'loading',
        content: '获取打印模板中…',
      });
    },
    onSuccess(res) {
      message.destroy(PRINT_KEY);
      setPrintDoc(res);
      setCurrentStep(currentStep + 1);
    },
    onError(err) {
      message.open({
        key: PRINT_KEY,
        type: 'error',
        content: err.message,
      });
    },
  });
  return (
    <>
      <HeadTitle titles={['签到']} />
      <iframe
        className={classes.printElement}
        srcDoc={printDoc ?? '请在打印步骤（步骤4）中点击下方按钮获取打印模板！'}
        onLoad={() => {
          // 模板载入完成后打开系统打印窗口
          if (printDoc) {
            window.print();
          }
        }}
      />
      <Card>
        <Steps
          current={currentStep}
          items={steps}
          style={{ marginBlockEnd: 50 }}
        />
        <Row gutter={[0, 24]} justify="center">
          {currentStep === STEP_1 ? (
            <Col xxl={8} xl={12} lg={16} md={20} sm={24} xs={24}>
              <Select
                style={{ width: '100%' }}
                disabled={signing}
                autoFocus
                showSearch
                allowClear
                filterOption={false}
                showArrow={false}
                placeholder="输入身份证号码进行搜索"
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
                  // 清除已选择的学生
                  setChosenStudent(null);
                }}
                onSelect={(_value, { student }) => {
                  // 设置当前选择的学生
                  setChosenStudent(student);
                }}
                onSearch={idCard => {
                  // 当关键字不为空时进行搜索服务
                  if (idCard) {
                    runSearch(idCard);
                  }
                }}
                options={students.map(student => {
                  return {
                    value: student.id,
                    disabled:
                      !!student.signed_operator &&
                      student.signed_operator.id !== idState,
                    label: (
                      <span className={classes.selectItem}>
                        <span style={{ marginInlineEnd: 8 }}>
                          {student.name}（{student.id_card}）
                        </span>
                        {student.sign_status ? (
                          <>
                            <Tag color="success">已签到</Tag>
                            {student.signed_operator ? (
                              <Tag
                                color={
                                  student.signed_operator.id === idState
                                    ? 'success'
                                    : 'warning'
                                }
                              >
                                隶属于
                                <span style={{ paddingInlineStart: 8 }}>
                                  {`${
                                    student.signed_operator.nickname ??
                                    student.signed_operator.username
                                  }${
                                    student.signed_operator.id === idState
                                      ? '（我）'
                                      : ''
                                  }`}
                                </span>
                              </Tag>
                            ) : null}
                          </>
                        ) : (
                          <Tag color="error">未签到</Tag>
                        )}
                      </span>
                    ),
                    student,
                  };
                })}
              />
            </Col>
          ) : null}
          {chosenStudent && currentStep > STEP_3 ? (
            <Col>
              <BasicPrint chosenStudent={chosenStudent} />
              <GdPrint chosenStudent={chosenStudent} />
              <LyPrint chosenStudent={chosenStudent} />
              <XqPrint chosenStudent={chosenStudent} />
            </Col>
          ) : null}
          {chosenStudent &&
          (currentStep === STEP_2 || currentStep === STEP_3) ? (
            <Col>
              <StudentDescriptions
                chosenStudent={chosenStudent}
                signStatus={
                  <Badge
                    status={currentStep > STEP_2 ? 'processing' : 'default'}
                    text="未签到"
                  />
                }
              />
            </Col>
          ) : null}
          <Col span={24} style={{ textAlign: 'center' }}>
            <Space size={16}>
              {chosenStudent && currentStep > STEP_1 && currentStep < STEP_4 ? (
                <Button
                  disabled={signing}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  上一步
                </Button>
              ) : null}
              {currentStep < STEP_4 ? (
                currentStep === STEP_3 ? (
                  <Button
                    type="primary"
                    danger
                    loading={signing}
                    onClick={() => {
                      if (chosenStudent) {
                        runSign(chosenStudent.id);
                      }
                    }}
                  >
                    签到
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    disabled={signing || !chosenStudent}
                    onClick={() => {
                      // 如果选择的是一个已签到的同学，那么直接到打印步骤
                      if (chosenStudent?.sign_status) {
                        setCurrentStep(STEP_4);
                      } else {
                        setCurrentStep(currentStep + 1);
                      }
                    }}
                  >
                    下一步
                  </Button>
                )
              ) : null}
              {currentStep === STEP_4 ? (
                <Button
                  type="primary"
                  disabled={signing}
                  loading={printing}
                  onClick={() => {
                    if (chosenStudent) {
                      runPrint(chosenStudent.id);
                    }
                  }}
                >
                  打印
                </Button>
              ) : null}
              {currentStep > STEP_4 ? (
                <>
                  <Button
                    disabled={signing}
                    loading={printing}
                    onClick={() => {
                      if (chosenStudent) {
                        runPrint(chosenStudent.id);
                      }
                    }}
                  >
                    重新打印
                  </Button>
                  <Button
                    type="primary"
                    disabled={signing || printing}
                    onClick={() => {
                      setCurrentStep(0);
                      setStudents([]);
                      setChosenStudent(null);
                      setPrintDoc(null);
                    }}
                  >
                    继续
                  </Button>
                </>
              ) : null}
            </Space>
          </Col>
        </Row>
      </Card>
    </>
  );
};

const SignInProvider: FC = () => {
  const { message } = AntdApp.useApp();
  const auth = useRecoilValue(authStateSelector);
  useMount(() => {
    if (!auth.token) {
      message.error('请先认证！');
    } else if (auth.permission !== 'SIGN') {
      message.error('权限不足！');
    }
  });
  return auth.token && auth.permission === 'SIGN' ? (
    <SignIn />
  ) : (
    <Navigate to="/" />
  );
};

export default SignInProvider;

import {
  interviewUserListService,
  signUserListService,
  updateStudentService,
} from '@/services';
import type { Student } from '@/typings';
import { useRequest } from 'ahooks';
import {
  App as AntdApp,
  Button,
  DatePicker,
  Divider,
  Drawer,
  Form,
  Radio,
  Result,
  Select,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import type { FormInstance } from 'antd/es';
import type { BaseOptionType, DefaultOptionType } from 'antd/es/select';
import dayjs from 'dayjs/esm';
import advancedFormat from 'dayjs/esm/plugin/advancedFormat';
import customParseFormat from 'dayjs/esm/plugin/customParseFormat';
import localeData from 'dayjs/esm/plugin/localeData';
import weekOfYear from 'dayjs/esm/plugin/weekOfYear';
import weekYear from 'dayjs/esm/plugin/weekYear';
import weekday from 'dayjs/esm/plugin/weekday';
import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InterviewFormItem } from './components';
import { UPDATE_STUDENT_KEY } from './constants';

// https://github.com/react-component/picker/issues/123
// https://blog.csdn.net/weixin_47287832/article/details/129270953
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
export const EditableAction: FC<{ student: Student }> = ({ student }) => {
  const [open, setOpen] = useState(false);
  const { message } = AntdApp.useApp();
  const formRef = useRef<FormInstance>(null);
  // 所有签到管理员
  const [signUserList, setSignUserList] = useState<
    (DefaultOptionType & BaseOptionType)[]
  >([]);
  // 所有面试管理员
  const [interviewUserList, setInterviewUserList] = useState<
    (DefaultOptionType & BaseOptionType)[]
  >([]);
  // 获取所有签到管理员服务
  const { run: runSignUserListService, loading: signUserListServiceLoading } =
    useRequest(signUserListService, {
      manual: true,
      onSuccess({ data }) {
        const list = data.map((user) => ({
          label: user.nickname || user.username,
          value: user.id,
        }));
        // 设置签到管理员
        setSignUserList(list);
      },
    });
  // 获取所有面试管理员服务
  const {
    run: runInterviewUserListService,
    loading: interviewUserListServiceLoading,
  } = useRequest(interviewUserListService, {
    manual: true,
    onSuccess({ data }) {
      const list = data.map((user) => ({
        label: user.nickname || user.username,
        value: user.id,
      }));
      // 设置面试管理员
      setInterviewUserList(list);
    },
  });
  // 当前响应式的签到状态
  const [signStatus, setSignStatus] = useState(false);
  // 运行服务
  useEffect(() => {
    if (!open) {
      return;
    }

    runSignUserListService();
    runInterviewUserListService();
    // 设置正确的签到状态
    setSignStatus(student.signStatus);
    formRef.current?.setFieldsValue({
      ...student,
      // 需要转换null类型
      urbanRailTransitInterview: student.urbanRailTransitInterview || 'SetNull',
      tourismManagementInterview:
        student.tourismManagementInterview || 'SetNull',
      earlyChildhoodEducationInterview:
        student.earlyChildhoodEducationInterview || 'SetNull',
      // 需要转换Day.js的格式
      signedDate: student.signedDate
        ? dayjs(student.signedDate, 'YYYY-MM-DD HH:mm:ss')
        : null,
      interviewedDate: student.interviewedDate
        ? dayjs(student.interviewedDate, 'YYYY-MM-DD HH:mm:ss')
        : null,
    });
  }, [open]);
  // 更新学生信息服务
  const { run: runUpdateStudentService, loading: updateStudentServiceLoading } =
    useRequest(updateStudentService, {
      manual: true,
      onBefore() {
        message.open({
          key: UPDATE_STUDENT_KEY,
          type: 'loading',
          content: '更新中…',
          duration: 0,
        });
      },
      onSuccess(res) {
        message.open({
          key: UPDATE_STUDENT_KEY,
          type: 'success',
          content: res.message,
        });
        // 关闭drawer
        setOpen(false);
      },
      onError(err) {
        message.open({
          key: UPDATE_STUDENT_KEY,
          type: 'error',
          content: `更新失败，${err.message}`,
        });
      },
    });
  const onClose = useCallback(() => {
    if (updateStudentServiceLoading) {
      return;
    }
    setOpen(false);
  }, [updateStudentServiceLoading]);
  const onFinish = useCallback(() => {
    let params = {
      ...formRef.current?.getFieldsValue(),
    };
    // 只有在已签到状态下，才需要转换提交的表单值
    if (signStatus) {
      params = {
        ...params,
        urbanRailTransitInterview:
          formRef.current?.getFieldValue('urbanRailTransitInterview') ===
          'SetNull'
            ? null
            : formRef.current?.getFieldValue('urbanRailTransitInterview'),
        tourismManagementInterview:
          formRef.current?.getFieldValue('tourismManagementInterview') ===
          'SetNull'
            ? null
            : formRef.current?.getFieldValue('tourismManagementInterview'),
        earlyChildhoodEducationInterview:
          formRef.current?.getFieldValue('earlyChildhoodEducationInterview') ===
          'SetNull'
            ? null
            : formRef.current?.getFieldValue(
                'earlyChildhoodEducationInterview',
              ),
        signedDate: formRef.current
          ?.getFieldValue('signedDate')
          .format('YYYY-MM-DD HH:mm:ss'),
        interviewedDate: formRef.current
          ?.getFieldValue('interviewedDate')
          .format('YYYY-MM-DD HH:mm:ss'),
      };
    }
    // 运行更新服务
    runUpdateStudentService({
      ...params,
      studentId: student.id,
    });
  }, [signStatus]);
  return (
    <>
      <Typography.Link onClick={() => setOpen(true)}>编辑</Typography.Link>
      <Drawer
        open={open}
        onClose={onClose}
        title={student.name}
        destroyOnClose
        extra={
          <Space>
            <Button onClick={onClose} disabled={updateStudentServiceLoading}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={() => formRef.current?.submit()}
              danger={
                !signStatus && !!(student.signedDate || student.interviewedDate)
              }
              loading={updateStudentServiceLoading}
            >
              提交
            </Button>
          </Space>
        }
      >
        {signUserListServiceLoading || interviewUserListServiceLoading ? (
          <Skeleton active />
        ) : null}
        <Form
          layout="vertical"
          autoComplete="off"
          ref={formRef}
          onFinish={onFinish}
          style={{
            display:
              signUserListServiceLoading || interviewUserListServiceLoading
                ? 'none'
                : undefined,
          }}
          disabled={updateStudentServiceLoading}
        >
          <Form.Item
            label="签到状态"
            name="signStatus"
            rules={[
              {
                required: true,
                message: '请选择签到状态',
              },
            ]}
          >
            <Radio.Group onChange={(ev) => setSignStatus(ev.target.value)}>
              <Radio value={true}>标记为已签到</Radio>
              <Radio value={false}>标记为未签到</Radio>
            </Radio.Group>
          </Form.Item>
          {signStatus ? (
            <>
              <Form.Item
                label="签到时间"
                name="signedDate"
                rules={[
                  {
                    required: true,
                    message: '请选择签到时间',
                  },
                ]}
              >
                <DatePicker showTime placeholder="请选择签到时间" />
              </Form.Item>
              <Form.Item
                label="执行人"
                name="signedUserId"
                rules={[
                  {
                    required: true,
                    message: '请选择执行人',
                  },
                ]}
              >
                <Select
                  placeholder="请选择执行人"
                  showSearch
                  allowClear
                  options={signUserList}
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
              <Divider />
              <InterviewFormItem
                label="城轨面试进度"
                name="urbanRailTransitInterview"
              />
              <InterviewFormItem
                label="旅游面试进度"
                name="tourismManagementInterview"
              />
              <InterviewFormItem
                label="学前面试进度"
                name="earlyChildhoodEducationInterview"
              />
              <Form.Item
                label="面试时间"
                name="interviewedDate"
                rules={[
                  {
                    required: true,
                    message: '请选择面试时间',
                  },
                ]}
              >
                <DatePicker showTime placeholder="请选择面试时间" />
              </Form.Item>
              <Form.Item
                label="执行人"
                name="interviewedUserId"
                rules={[
                  {
                    required: true,
                    message: '请选择执行人',
                  },
                ]}
              >
                <Select
                  placeholder="请选择执行人"
                  showSearch
                  allowClear
                  options={interviewUserList}
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </>
          ) : student.signedDate || student.interviewedDate ? (
            <Result
              status="warning"
              title="该学生有过签到或面试的记录"
              subTitle="如果仍然提交，则该学生的签到记录（签到状态、签到时间、签到执行人）和面试记录（面试时间、面试进度、面试执行人）将重置为默认值"
            />
          ) : null}
        </Form>
      </Drawer>
    </>
  );
};

import { GlobalErrorBoundary, PageNotFound } from '@/components';
import {
  AUTHENTICATION_PATHNAME,
  MANAGE_LOG_PATHNAME,
  MANAGE_STUDENT_PATHNAME,
  STUDENT_INTERVIEW_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '@/constants';
import { BasicLayout } from '@/layouts';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

// 主页面
// eslint-disable-next-line react-refresh/only-export-components
const Home = lazy(() => import('@/pages/Home'));

// 认证页面
// eslint-disable-next-line react-refresh/only-export-components
const Auth = lazy(() => import('@/pages/Auth'));

// 签到页面
// eslint-disable-next-line react-refresh/only-export-components
const StudentSignIn = lazy(() => import('@/pages/Student/SignIn'));

// 面试页面
// eslint-disable-next-line react-refresh/only-export-components
const StudentInterview = lazy(() => import('@/pages/Student/Interview'));

// 学生管理页面
// eslint-disable-next-line react-refresh/only-export-components
const ManageStudent = lazy(() => import('@/pages/Manage/Student'));

// 日志管理页面
// eslint-disable-next-line react-refresh/only-export-components
const ManageLog = lazy(() => import('@/pages/Manage/Log'));

export default [
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      // 主页面
      {
        path: '/',
        element: <Home />,
      },
      // （登录）页面
      {
        path: AUTHENTICATION_PATHNAME,
        element: <Auth />,
      },
      // 签到页面
      {
        path: STUDENT_SIGN_IN_PATHNAME,
        element: <StudentSignIn />,
      },
      // 面试页面
      {
        path: STUDENT_INTERVIEW_PATHNAME,
        element: <StudentInterview />,
      },
      // 学生管理页面
      {
        path: MANAGE_STUDENT_PATHNAME,
        element: <ManageStudent />,
      },
      // 日志管理页面
      {
        path: MANAGE_LOG_PATHNAME,
        element: <ManageLog />,
      },
    ],
  },
  // 页面不存在
  { path: '*', element: <PageNotFound /> },
] as RouteObject[];

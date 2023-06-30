import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';
import PageNotFound from '../components/PageNotFound';
import {
  AUTH_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '../constant/path';
import BasicLayout from '../layouts/BasicLayout';

// 主页
const HomePage = lazy(() => import('../pages/Home'));
// 认证
const AuthPage = lazy(() => import('../pages/Auth'));
// 签到
const StudentSignInPage = lazy(() => import('../pages/StudentSignIn'));
// 面试
const InterviewPage = lazy(() => import('../pages/Interview'));
// 管理
const ManagePage = lazy(() => import('../pages/Manage'));

export default [
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      // 主页
      {
        path: '/',
        element: <HomePage />,
      },
      // 认证页面
      {
        path: AUTH_PATHNAME,
        element: <AuthPage />,
      },
      // 签到页面
      {
        path: STUDENT_SIGN_IN_PATHNAME,
        element: <StudentSignInPage />,
      },
      // 面试页面
      {
        path: INTERVIEW_PATHNAME,
        element: <InterviewPage />,
      },
      // 管理页面
      {
        path: MANAGE_PATHNAME,
        element: <ManagePage />,
      },
    ],
  },
  // 页面不存在
  { path: '*', element: <PageNotFound /> },
] as RouteObject[];

import { GlobalErrorBoundary, PageNotFound } from '@/components';
import {
  AUTHENTICATION_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
  STUDENT_SIGN_IN_PATHNAME,
} from '@/constants';
import { BasicLayout } from '@/layouts';
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// 主页
// eslint-disable-next-line react-refresh/only-export-components
const HomePage = lazy(() => import('@/pages/Home'));
// 认证
// eslint-disable-next-line react-refresh/only-export-components
const AuthenticationPage = lazy(() => import('@/pages/Authentication'));
// 签到
// eslint-disable-next-line react-refresh/only-export-components
const SignInOfStudentPage = lazy(() => import('@/pages/SignInOfStudent'));
// 面试
// eslint-disable-next-line react-refresh/only-export-components
const InterviewPage = lazy(() => import('@/pages/Interview'));
// 管理
// eslint-disable-next-line react-refresh/only-export-components
const ManagePage = lazy(() => import('@/pages/Manage'));

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
        path: AUTHENTICATION_PATHNAME,
        element: <AuthenticationPage />,
      },
      // 签到页面
      {
        path: STUDENT_SIGN_IN_PATHNAME,
        element: <SignInOfStudentPage />,
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

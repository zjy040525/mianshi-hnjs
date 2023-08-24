import { GlobalErrorBoundary, PageNotFound } from '@/components';
import {
  AUTHENTICATION_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
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
const Interview = lazy(() => import('@/pages/Interview'));

// 管理页面
// eslint-disable-next-line react-refresh/only-export-components
const Manage = lazy(() => import('@/pages/Manage'));

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
        path: INTERVIEW_PATHNAME,
        element: <Interview />,
      },
      // 管理页面
      {
        path: MANAGE_PATHNAME,
        element: <Manage />,
      },
    ],
  },
  // 页面不存在
  { path: '*', element: <PageNotFound /> },
] as RouteObject[];

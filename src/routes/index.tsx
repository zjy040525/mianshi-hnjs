import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';
import PageNotFound from '../components/PageNotFound';
import {
  AUTH_PATHNAME,
  INTERVIEW_PATHNAME,
  MANAGE_PATHNAME,
  SIGN_IN_PATHNAME,
} from '../constant/path';
import BasicLayout from '../layouts/BasicLayout';

// 主页
const Home = lazy(() => import('../pages/Home'));
// 认证
const AuthProvider = lazy(() => import('../pages/Auth'));
// 签到
const SignInProvider = lazy(() => import('../pages/SignIn'));
// 面试
const InterviewProvider = lazy(() => import('../pages/Interview'));
// 管理
const ManageProvider = lazy(() => import('../pages/Manage'));

export default [
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      // 主页
      {
        path: '/',
        element: <Home />,
      },
      // 认证页面
      {
        path: AUTH_PATHNAME,
        element: <AuthProvider />,
      },
      // 签到页面
      {
        path: SIGN_IN_PATHNAME,
        element: <SignInProvider />,
      },
      // 面试页面
      {
        path: INTERVIEW_PATHNAME,
        element: <InterviewProvider />,
      },
      // 管理页面
      {
        path: MANAGE_PATHNAME,
        element: <ManageProvider />,
      },
    ],
  },
  // 页面不存在
  { path: '*', element: <PageNotFound /> },
] as RouteObject[];

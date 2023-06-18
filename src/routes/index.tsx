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
const Auth = lazy(() => import('../pages/Auth'));
// 签到
const SignIn = lazy(() => import('../pages/SignIn'));
// 面试
const Interview = lazy(() => import('../pages/Interview'));
// 管理
const Manage = lazy(() => import('../pages/Manage'));

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
        element: <Auth />,
      },
      // 签到页面
      {
        path: SIGN_IN_PATHNAME,
        element: <SignIn />,
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

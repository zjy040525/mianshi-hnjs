import { App as AppProvider, ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import locale from 'antd/locale/zh_CN';
import * as dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { AuthorizationGuard, GlobalLoading } from './components';
import routes from './routes';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <ConfigProvider locale={locale}>
          <AppProvider notification={{ maxCount: 5 }}>
            <AuthorizationGuard>
              <React.Suspense fallback={<GlobalLoading />}>
                <RouterProvider router={createBrowserRouter(routes)} />
              </React.Suspense>
            </AuthorizationGuard>
          </AppProvider>
        </ConfigProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

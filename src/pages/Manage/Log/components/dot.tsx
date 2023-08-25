import type { RecordType } from '@/typings';
import {
  FileTextOutlined,
  LoginOutlined,
  PrinterOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const dot = (type: RecordType) => {
  switch (type) {
    case 'Auth':
      return <UserOutlined />;
    case 'Sign':
      return <LoginOutlined />;
    case 'Print':
      return <PrinterOutlined />;
    case 'Interview':
      return <FileTextOutlined />;
  }
};

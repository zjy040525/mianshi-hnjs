import { RECOIL_PERSIST_LOCAL_STORAGE_KEY } from '@/constants';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_LOCAL_STORAGE_KEY,
});

// 拥有admin-all权限的用户的`新消息通知`开关，开启后在`管理`页面将接收到其他不同权限用户的操作信息
export const adminNewMsgNotification = atom<boolean>({
  key: 'adminNewMsgNotification',
  effects_UNSTABLE: [persistAtom],
  default: true,
});

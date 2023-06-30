import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 管理员的`新消息通知`开关，开启后在`管理`页面将接收到不同操作者的操作信息
export const newMsgNotificationOfAdmin = atom<boolean>({
  key: 'newMsgNotificationOfAdmin',
  effects_UNSTABLE: [persistAtom],
  default: true,
});

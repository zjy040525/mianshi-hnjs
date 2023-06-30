import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const newMsgNotificationOfAdmin = atom<boolean>({
  key: 'newMsgNotificationOfAdmin',
  effects_UNSTABLE: [persistAtom],
  default: true,
});

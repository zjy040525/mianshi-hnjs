import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const tokenStateAtom = atom({
  key: 'tokenStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const permissionStateAtom = atom({
  key: 'permissionStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

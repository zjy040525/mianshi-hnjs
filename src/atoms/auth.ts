import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import type { Permission } from '../types/permission';

const { persistAtom } = recoilPersist();

export const tokenStateAtom = atom<string | null>({
  key: 'tokenStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const permissionStateAtom = atom<Permission | null>({
  key: 'permissionStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const nicknameStateAtom = atom<string | null>({
  key: 'nicknameStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const usernameStateAtom = atom<string | null>({
  key: 'usernameStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const idStateAtom = atom<number | null>({
  key: 'idStateAtom',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

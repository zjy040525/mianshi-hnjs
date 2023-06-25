import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import type { Permission } from '../types/permission';

const { persistAtom } = recoilPersist();

export const idStateAtom = atom<number | null>({
  key: 'idStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

export const tokenStateAtom = atom<string | null>({
  key: 'tokenStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

export const usernameStateAtom = atom<string | null>({
  key: 'usernameStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

export const nicknameStateAtom = atom<string | null>({
  key: 'nicknameStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

export const permissionStateAtom = atom<Permission | null>({
  key: 'permissionStateAtom',
  default: null,
});

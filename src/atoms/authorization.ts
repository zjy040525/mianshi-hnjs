import { RECOIL_PERSIST_LOCAL_STORAGE_KEY } from '@/constants';
import type { Role } from '@/typings';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: RECOIL_PERSIST_LOCAL_STORAGE_KEY,
});

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

// 用户昵称，没有昵称则会显示`用户名`
export const nicknameStateAtom = atom<string | null>({
  key: 'nicknameStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

// 用户访问权限
export const roleStateAtom = atom<Role | null>({
  key: 'roleStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

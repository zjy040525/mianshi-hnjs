import type { Permission } from '@/typings';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

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

// 操作者的昵称，没有昵称则会显示`用户名`
export const nicknameStateAtom = atom<string | null>({
  key: 'nicknameStateAtom',
  effects_UNSTABLE: [persistAtom],
  default: null,
});

// 操作者访问的权限
export const permissionStateAtom = atom<Permission | null>({
  key: 'permissionStateAtom',
  default: null,
});

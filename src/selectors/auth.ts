import { DefaultValue, selector } from 'recoil';
import {
  idStateAtom,
  nicknameStateAtom,
  permissionStateAtom,
  tokenStateAtom,
  usernameStateAtom,
} from '../atoms/auth';
import type { Permission } from '../types/permission';
import { setAuthToken } from '../utils/storage';

export const authStateSelector = selector<{
  id: number | null;
  token: string | null;
  username: string | null;
  nickname: string | null;
  permission: Permission | null;
}>({
  key: 'authStateSelector',
  get: ({ get }) => ({
    id: get(idStateAtom),
    token: get(tokenStateAtom),
    username: get(usernameStateAtom),
    nickname: get(nicknameStateAtom),
    permission: get(permissionStateAtom),
  }),
  set: ({ set }, newValue) => {
    // TODO: DefaultValue
    if (!(newValue instanceof DefaultValue)) {
      set(idStateAtom, newValue.id);
      setAuthToken(newValue.token);
      set(tokenStateAtom, newValue.token);
      set(usernameStateAtom, newValue.username);
      set(nicknameStateAtom, newValue.nickname);
      set(permissionStateAtom, newValue.permission);
    }
  },
});

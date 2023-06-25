import { DefaultValue, selector } from 'recoil';
import {
  idStateAtom,
  nicknameStateAtom,
  permissionStateAtom,
  tokenStateAtom,
  usernameStateAtom,
} from '../atoms/auth';
import { setAuthToken } from '../utils/storage';

export const authStateSelector = selector({
  key: 'authStateSelector',
  get: ({ get }) => ({
    id: get(idStateAtom),
    token: get(tokenStateAtom),
    username: get(usernameStateAtom),
    nickname: get(nicknameStateAtom),
    permission: get(permissionStateAtom),
  }),
  set: ({ set }, newValue) => {
    const defaultValue = newValue instanceof DefaultValue;

    set(idStateAtom, defaultValue ? null : newValue.id);
    setAuthToken(defaultValue ? null : newValue.token);
    set(tokenStateAtom, defaultValue ? null : newValue.token);
    set(usernameStateAtom, defaultValue ? null : newValue.username);
    set(nicknameStateAtom, defaultValue ? null : newValue.nickname);
    set(permissionStateAtom, defaultValue ? null : newValue.permission);
  },
});

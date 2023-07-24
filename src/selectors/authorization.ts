import {
  idStateAtom,
  nicknameStateAtom,
  permissionStateAtom,
  tokenStateAtom,
  usernameStateAtom,
} from '@/atoms';
import { removeAuthorizationToken, setAuthorizationToken } from '@/utils';
import { DefaultValue, selector } from 'recoil';

export const authorizationStateSelector = selector({
  key: 'authorizationStateSelector',
  get: ({ get }) => ({
    id: get(idStateAtom),
    token: get(tokenStateAtom),
    username: get(usernameStateAtom),
    nickname: get(nicknameStateAtom),
    permission: get(permissionStateAtom),
  }),
  set({ set }, newValue) {
    if (newValue instanceof DefaultValue) {
      set(idStateAtom, null);
      removeAuthorizationToken();
      set(tokenStateAtom, null);
      set(usernameStateAtom, null);
      set(nicknameStateAtom, null);
      set(permissionStateAtom, null);
    } else {
      set(idStateAtom, newValue.id);
      setAuthorizationToken(newValue.token);
      set(tokenStateAtom, newValue.token);
      set(usernameStateAtom, newValue.username);
      set(nicknameStateAtom, newValue.nickname);
      set(permissionStateAtom, newValue.permission);
    }
  },
});

import {
  idStateAtom,
  nicknameStateAtom,
  roleStateAtom,
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
    role: get(roleStateAtom),
  }),
  set({ set }, newValue) {
    if (newValue instanceof DefaultValue) {
      set(idStateAtom, null);
      removeAuthorizationToken();
      set(tokenStateAtom, null);
      set(usernameStateAtom, null);
      set(nicknameStateAtom, null);
      set(roleStateAtom, null);
    } else {
      set(idStateAtom, newValue.id);
      setAuthorizationToken(newValue.token);
      set(tokenStateAtom, newValue.token);
      set(usernameStateAtom, newValue.username);
      set(nicknameStateAtom, newValue.nickname);
      set(roleStateAtom, newValue.role);
    }
  },
});

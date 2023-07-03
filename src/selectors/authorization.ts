import { DefaultValue, selector } from 'recoil';
import {
  idStateAtom,
  nicknameStateAtom,
  permissionStateAtom,
  tokenStateAtom,
  usernameStateAtom,
} from '../atoms/authorization';
import { setAuthorizationToken } from '../utils/storage';

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
    const isDefault = newValue instanceof DefaultValue;

    set(idStateAtom, isDefault ? null : newValue.id);
    setAuthorizationToken(isDefault ? null : newValue.token);
    set(tokenStateAtom, isDefault ? null : newValue.token);
    set(usernameStateAtom, isDefault ? null : newValue.username);
    set(nicknameStateAtom, isDefault ? null : newValue.nickname);
    set(permissionStateAtom, isDefault ? null : newValue.permission);
  },
});

import { DefaultValue, selector } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../atoms/auth';
import type { Permission } from '../types/permission';
import { setAuthToken } from '../utils/storage';

export const authStateSelector = selector<{
  token: string | null;
  permission: Permission | null;
}>({
  key: 'authStateSelector',
  get: ({ get }) => ({
    token: get(tokenStateAtom),
    permission: get(permissionStateAtom),
  }),
  set: ({ set }, newValue) => {
    // TODO: DefaultValue
    if (!(newValue instanceof DefaultValue)) {
      if (newValue.token) {
        setAuthToken(newValue.token);
      }
      set(tokenStateAtom, newValue.token);
      set(permissionStateAtom, newValue.permission);
    }
  },
});

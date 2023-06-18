import { RecoilState, selector } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../atoms/auth';
import type { Permission } from '../types/permission';
import { setAuthToken } from '../utils/storage';

export const authStateSelector: RecoilState<{
  token: string | null;
  permission: Permission | null;
}> = selector({
  key: 'authStateSelector',
  get: ({ get }) => get(tokenStateAtom),
  set: ({ set }, newValue) => {
    if (newValue.token) {
      setAuthToken(newValue.token);
    }
    set(tokenStateAtom, newValue.token);
    set(permissionStateAtom, newValue.permission);
  },
});

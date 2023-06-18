import { selector } from 'recoil';
import { permissionStateAtom, tokenStateAtom } from '../atoms/auth';
import { setAuthToken } from '../utils/storage';

export const authStateSelector = selector({
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

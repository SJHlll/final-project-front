import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    isLoggedIn: true,
    role: 'COMMON', // or 'ADMIN'
  },
});

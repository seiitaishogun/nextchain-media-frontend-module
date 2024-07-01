import { atom } from 'recoil';
import localStorageEffect from '@module/utils/recoil/localStorageEffect';
import { userContentFormKey, userInfoKey } from '@module/constants/user';

const userContentFormAtom = atom<any>({
  key: 'userContentFormAtom',
  default: null,
  effects_UNSTABLE: [localStorageEffect(userContentFormKey)],
});

const userInfoAtom = atom<any>({
  key: 'userInfoAtom',
  default: null,
  effects_UNSTABLE: [localStorageEffect(userInfoKey)],
});

export { userContentFormAtom, userInfoAtom };

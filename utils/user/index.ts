import { parseJSON, stringifyJSON } from '@module/utils/storage';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@module/utils/storage/localStorage';
import { userInfoKey } from '@module/constants/user';

const setUserInfoStorage = (values: any) => {
  try {
    const userInfo = parseJSON(getLocalStorageItem(userInfoKey)) || {};
    const newUser = {
      name: values?.name || userInfo?.name || '',
      phone: values?.phone || userInfo?.phone || '',
    };
    setLocalStorageItem(userInfoKey, stringifyJSON(newUser));
  } catch {
    /* empty */
  }
};

export { setUserInfoStorage };

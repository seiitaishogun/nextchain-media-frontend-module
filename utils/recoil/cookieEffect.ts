import { AtomEffect } from 'recoil';
import { deleteCookie } from 'cookies-next';
import { parseJSON } from '@module/utils/storage';
import { getCookieItem, setCookieItem } from '@module/utils/storage/cookie';

const cookieEffect: <T>(key: string) => AtomEffect<T> =
  (key: string) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = getCookieItem(key);
      if (savedValue !== null) {
        setSelf(parseJSON(savedValue));
      }

      onSet((newValue: any, _, isReset) => {
        if (isReset) {
          deleteCookie(key);
        } else {
          setCookieItem(key, newValue);
        }
      });
    }
  };

export default cookieEffect;

import { deleteCookie, getCookie, hasCookie, setCookie } from 'cookies-next';
import { parseJSON, stringifyJSON } from '@module/utils/storage';

const getCookieItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const savedValue = getCookie(key);
    if (hasCookie(key)) {
      return parseJSON(savedValue as string);
    }
  }
  return null;
};

const setCookieItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    if (value === null) {
      deleteCookie(key);
    } else if (typeof value === 'object') {
      setCookie(key, stringifyJSON(Array.from(value.entries())), {
        expires: new Date(2050, 0, 1),
      });
    } else {
      setCookie(key, stringifyJSON(value));
    }
  }
};

export { getCookieItem, setCookieItem };

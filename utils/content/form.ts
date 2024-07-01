import { format } from 'date-fns';
import { parseJSON, stringifyJSON } from '@module/utils/storage';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '@module/utils/storage/localStorage';
import { localStorageKey } from '@module/constants/content/form';
import { userContentFormKey as userKey } from '@module/constants/user';

const setContentFormStorage = (contentId: number, values: any) => {
  try {
    const formData = new Map(
      parseJSON(getLocalStorageItem(localStorageKey)) || null
    );

    const curValues = formData.get(contentId) || {};
    formData.set(contentId, { ...curValues, ...values });
    setLocalStorageItem(
      localStorageKey,
      stringifyJSON(Array.from(formData.entries()))
    );

    const userInfo = parseJSON(getLocalStorageItem(userKey)) || {};
    const newUser = {
      user: {
        ...(userInfo?.user || {}),
        ...values.user,
      },
      partner: {
        ...(userInfo?.partner || {}),
        ...(values?.partner || {}),
      },
    };
    setLocalStorageItem(userKey, stringifyJSON(newUser));
  } catch {
    /* empty */
  }
};

/**
 * react-hook-form 의 name 을 반환합니다.
 * @param property
 * @param isUser
 */
function getName({ property, isUser }: { property: string; isUser: boolean }) {
  const name = isUser ? 'user' : 'partner';
  return `${name}.${property}`;
}

const getUserRequest = (user: any) => {
  if (!user) return {};
  const {
    name,
    gender,
    marital,
    calendar,
    year,
    month,
    day,
    hour,
    minute,
    is_birthed_time,
  } = user;
  const birthed_at = format(
    new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      is_birthed_time ? Number(hour) : 0,
      is_birthed_time ? Number(minute) : 0
    ),
    'yyyy-MM-dd HH:mm:00'
  );

  return {
    name,
    gender: Number(gender),
    marital,
    birthed_at,
    is_birthed_time,
    calendar,
    value: null,
  };
};

export { setContentFormStorage, getName, getUserRequest };

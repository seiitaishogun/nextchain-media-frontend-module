import { useEffect } from 'react';
import debounce from 'lodash.debounce';
import { setUserInfoStorage } from '@module/utils/user';

interface Props {
  isDirty: boolean;
  formValues: any;
}

function useSaveUserInfo({ isDirty, formValues }: Props) {
  useEffect(() => {
    const saveFormValues = debounce(values => {
      setUserInfoStorage(values);
    }, 1000);

    if (isDirty) saveFormValues(formValues);

    return () => {
      saveFormValues.cancel();
    };
  }, [formValues]);
}

export default useSaveUserInfo;

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import useFormTrigger from '@module/hooks/form/useFormTrigger';
import { userInfoAtom } from '@module/store/user';

interface Props {
  trigger: any;
  setValue: any;
  reset: any;
}

function useResetUserInfo({ trigger, setValue, reset }: Props) {
  const userInfo = useRecoilValue(userInfoAtom);
  const { handleTrigger } = useFormTrigger({ trigger });

  useEffect(() => {
    setValue('name', userInfo?.name || '');
    setValue('phone', userInfo?.phone || '');
    setValue('pin', '');

    handleTrigger();

    return () => {
      reset();
    };
  }, []);

  return null;
}

export default useResetUserInfo;

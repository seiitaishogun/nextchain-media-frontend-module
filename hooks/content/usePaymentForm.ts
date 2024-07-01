import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserInfoT } from '@module/types/user';
import { USER_DEFAULT_VALUES, userSchema } from '@module/constants/user/form';

function usePaymentForm() {
  return useForm<UserInfoT>({
    mode: 'all',
    resolver: yupResolver(userSchema),
    defaultValues: USER_DEFAULT_VALUES,
  });
}

export default usePaymentForm;

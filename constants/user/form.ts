import * as yup from 'yup';

const userSchema = yup.object().shape({
  name: yup.string().required(),
  phone: yup
    .string()
    .min(7)
    .max(11)
    .test('is-number', '숫자만 입력해주세요', value =>
      Number.isInteger(Number(value))
    )
    .required(),
  pin: yup
    .string()
    .length(4)
    .test('is-number', '숫자만 입력해주세요', value =>
      Number.isInteger(Number(value))
    )
    .required(),
});

const USER_DEFAULT_VALUES = {
  name: '',
  phone: '',
  pin: '',
};

export { userSchema, USER_DEFAULT_VALUES };

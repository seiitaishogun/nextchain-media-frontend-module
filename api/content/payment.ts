import { instance } from '@module/utils/axios';
import {
  PaymentHashRequest,
  PaymentHashResponse,
} from '@module/types/content/payment';

const fetchPaymentHash = async (params: PaymentHashRequest) => {
  const { data } = await instance.post<PaymentHashResponse>(
    `/payments/hash`,
    params
  );
  return data;
};

export default fetchPaymentHash;

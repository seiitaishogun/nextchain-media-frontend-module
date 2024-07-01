import { setCookie } from 'cookies-next';
import { USER_PURCHASE_HASH_KEY } from '@module/constants/user/hash';

const handleUpdatePurchaseHash = (purchaseHash: string) =>
  setCookie(USER_PURCHASE_HASH_KEY, purchaseHash, {
    expires: new Date(2050, 0, 1),
  });

export { handleUpdatePurchaseHash };

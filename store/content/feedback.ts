import { atom, selectorFamily } from 'recoil';
import cookieEffect from '@module/utils/recoil/cookieEffect';
import { feedbackCookieName } from '@module/constants/content/feedback';

const purchaseFeedbackAtom = atom<any>({
  key: 'purchasesFeedbackAtom',
  default: new Map(),
  effects_UNSTABLE: [cookieEffect(feedbackCookieName)],
});

const purchaseFeedbackSelector: any = selectorFamily({
  key: 'purchaseFeedbackSelector',
  get:
    (purchaseId?: number) =>
    ({ get }) => {
      if (!purchaseId) return null;
      try {
        const formData = new Map(get(purchaseFeedbackAtom));
        return formData.get(purchaseId) || null;
      } catch (err) {
        return null;
      }
    },
  set:
    (purchaseId?: number) =>
    ({ get, set, reset }, newValue) => {
      if (!purchaseId) return;
      try {
        const formData = new Map(get(purchaseFeedbackAtom));

        if (newValue) {
          formData.set(purchaseId, newValue);
        } else {
          formData.delete(purchaseId);
        }

        set(purchaseFeedbackAtom, formData);
      } catch (err) {
        reset(purchaseFeedbackAtom);
      }
    },
});

export { purchaseFeedbackAtom, purchaseFeedbackSelector };

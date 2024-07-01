import { atom, selectorFamily } from 'recoil';
import cookieEffect from '@module/utils/recoil/cookieEffect';
import { likeCookieName } from '@module/constants/content/like';

const contentLikeAtom = atom({
  key: 'contentsLikeAtom',
  default: new Map(),
  effects_UNSTABLE: [cookieEffect(likeCookieName)],
});

const contentLikeSelector = selectorFamily({
  key: 'contentLikeSelector',
  get:
    (contendId: number) =>
    ({ get }) => {
      try {
        const formData = new Map(get(contentLikeAtom));
        return !!formData.get(contendId) || false;
      } catch (err) {
        return false;
      }
    },
  set:
    (contendId: number) =>
    ({ get, set, reset }, newValue) => {
      try {
        const formData = new Map(get(contentLikeAtom));

        if (newValue) {
          formData.set(contendId, newValue);
        } else {
          formData.delete(contendId);
        }

        set(contentLikeAtom, formData);
      } catch (err) {
        reset(contentLikeAtom);
      }
    },
});

export { contentLikeAtom, contentLikeSelector };

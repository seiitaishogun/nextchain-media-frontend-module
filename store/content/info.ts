import { atom } from 'recoil';
import { ContentTypeE } from '@module/types/content';

const contentInfoAtom = atom<{
  type?: ContentTypeE;
  category_id?: number;
  banner?: string;
  banner_mobile?: string;
}>({
  key: 'contentInfoAtom',
  default: {},
});

export { contentInfoAtom };

import { useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { ContentDetailT } from '@module/types/content/detail';
import { contentInfoAtom } from '@module/store/content/info';

interface Props {
  content: ContentDetailT;
}

function useSaveContentInfo({ content }: Props) {
  const setContentInfo = useSetRecoilState(contentInfoAtom);
  const resetContentInfo = useResetRecoilState(contentInfoAtom);

  useEffect(() => {
    if (content) {
      setContentInfo({
        type: content?.type?.name,
        category_id: content.category?.id,
        banner: content.banner || undefined,
        banner_mobile: content.banner_mobile || undefined,
      });
    }

    return () => {
      resetContentInfo();
    };
  }, [content]);

  return null;
}

export default useSaveContentInfo;

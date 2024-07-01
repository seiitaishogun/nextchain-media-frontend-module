import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { fetchContentDetail } from '@module/api/content';
import { ContentTypeE } from '@module/types/content';
import { ContentDetailT } from '@module/types/content/detail';
import { getErrorMessage } from '@module/utils/content/message';

interface Props {
  id: number;
  setAlertOptions: (options: any) => void;
}

function useContentDetailData({ id, setAlertOptions }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  return useQuery(['contentDetail', { id }], () => fetchContentDetail({ id }), {
    select: res => res.data,
    initialData: () => ({
      data: {
        banner: null,
        banner_mobile: null,
        category: null,
        contents: '',
        id: 0,
        is_partner: false,
        is_skip: false,
        like_count: 0,
        name: '',
        price: 0,
        discount_price : 0,
        discount_percent : 0,
        is_discount: false,
        sample: null,
        sample_mobile: null,
        share_count: 0,
        summary: '',
        tags: [],
        tarot: [],
        tarot_count: 0,
        thumbnail: null,
        type: {
          id: 0,
          name: '' as ContentTypeE,
          description: '',
          is_skip: false,
        },
        view_count: 0,
      } as ContentDetailT,
    }),
    onError: (err: any) => {
      setAlertOptions({
        isOpen: true,
        description: getErrorMessage(err),
        handleConfirm: () => {
          const isMobile = pathname.includes('/m');
          const url = isMobile ? '/m' : '/';
          router.replace(url);
        },
      });
    },
  });
}

export default useContentDetailData;

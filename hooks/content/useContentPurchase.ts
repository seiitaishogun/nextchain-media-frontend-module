import { UseFormGetValues } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ContentTypeE } from '@module/types/content';
import useContentPurchaseMutate from '@module/hooks/content/useContentPurchaseMutate';
import { ContentDetailT } from '@module/types/content/detail';
import { contentFormSelector } from '@module/store/content/form';
import { getUserRequest } from '@module/utils/content/form';
import { fetchContentVerify } from '@module/api/content';
import useDataCollection from '@module/hooks/common/useDataCollection';

interface Props {
  content: ContentDetailT;
  getValues: UseFormGetValues<any>;
  setAlertOptions: (options: any) => void;
}

function useContentPurchase({ content, getValues, setAlertOptions }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [contentForm, setContentForm] = useRecoilState(
    contentFormSelector(content.id)
  );

  const purchasesMutate = useContentPurchaseMutate({
    content,
    setAlertOptions,
  });
  const verifyMutate = useMutation(fetchContentVerify);

  const {
    handleContentPurchaseEvent,
    handleLogContentErrorEvent,
    handleContentPurchaseClickEvent,
  } = useDataCollection();

  const handleSubmit = ({
    name,
    pin,
    phone,
  }: {
    name?: string;
    pin?: string;
    phone?: string;
  }) => {
    if (purchasesMutate.isLoading) return;

    handleContentPurchaseClickEvent({
      content_id: content.id,
      content_name: content.name,
      content_price: content.price,
      content_category: content?.category?.name,
    });

    const formData = {
      ...contentForm,
      ...getValues(),
    };
    setContentForm(formData);

    if (content.price > 0) {
      handleRedirectPayment();
    } else {
      const params = getPurchaseRequest({ name, pin, phone });
      purchasesMutate.mutate(params, {
        onSuccess: res => {
          const { purchase_id } = res.data;
          handleContentPurchaseEvent({
            purchase: {
              id: purchase_id,
            },
            content,
          });
          const isMobile = pathname.includes('/m');
          const url = `${isMobile ? '/m' : ''}/contents/${
            content.id
          }/result/${purchase_id}`;
          router.push(url);
        },
        onError: err => {
          handleLogContentErrorEvent({
            content_id: content.id,
            current_page: 'purchase',
            error_log: err,
            purchase_id: null,
          });
        },
      });
    }
  };

  const handleRedirectPayment = () => {
    if (content.type.name === ContentTypeE.Saju) {
      const params: any = {
        data: [],
      };
      const formData = {
        ...contentForm,
        ...getValues(),
      };

      const { user } = formData;
      const userData = getUserRequest(user);
      params.data.push(userData);

      if (content.is_partner) {
        const { partner } = formData;
        const partnerData = getUserRequest(partner);
        params.data.push(partnerData);
      }

      verifyMutate.mutate(params, {
        onSuccess: () => {
          const isMobile = pathname.includes('/m');
          const url = `${isMobile ? '/m' : ''}/contents/${content.id}/payments`;
          router.push(url);
        },
        onError: () => {
          setAlertOptions({
            isOpen: true,
            description: '생년월일 정보가 잘못 되었습니다.',
            handleConfirm: () => {
              setAlertOptions({
                isOpen: false,
                title: '',
                description: '',
                confirmText: '',
                handleConfirm: () => {},
              });
            },
          });
        },
      });
    } else {
      const isMobile = pathname.includes('/m');
      const url = `${isMobile ? '/m' : ''}/contents/${content.id}/payments`;
      router.push(url);
    }
  };

  const getPurchaseRequest = ({
    name,
    pin,
    phone,
  }: {
    name?: string;
    pin?: string;
    phone?: string;
  }) => {
    const formData = {
      ...contentForm,
      ...getValues(),
    };

    const params: any = {
      content_id: content.id,
      data: [],
      purchase_name: name,
      pin,
      phone,
    };

    if (content.type.name === ContentTypeE.Saju) {
      const { user } = formData;
      const userData = getUserRequest(user);
      params.data.push(userData);

      if (content.is_partner) {
        const { partner } = formData;
        const partnerData = getUserRequest(partner);
        params.data.push(partnerData);
      }
    } else if (content.type.name === ContentTypeE.Tarot) {
      const { user, tarot } = formData;
      params.data.push({
        ...user,
        value: tarot.join(','),
      });

      if (content.is_partner) {
        const { partner } = formData;
        params.data.push({
          ...partner,
          value: tarot.join(','),
        });
      }
    }

    return params;
  };

  return {
    handleRedirectPayment,
    getPurchaseRequest,
    purchasesMutate,
    getUserRequest,
    handleSubmit,
    isLoading: purchasesMutate.isLoading || verifyMutate.isLoading,
  };
}

export default useContentPurchase;

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { fetchShare } from '@module/api/common/share';
import useAlert from '@module/hooks/common/useAlert';
import { USER_PURCHASE_HASH_KEY } from '@module/constants/user/hash';
import { KakaoShareOptions } from '@module/types/common/share';

interface Props {
  kakaoOptions: KakaoShareOptions;
  ShareComponent: any;
}

function useShare({ kakaoOptions, ShareComponent }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const { renderMessage, handleReset, setAlertOptions } = useAlert();
  const { mutate, isLoading } = useMutation(['share'], fetchShare);

  const handleShare = () => {
    if (isLoading || isOpen) return;
    if (url) {
      setIsOpen(true);
      setUrl(url);
      return;
    }

    mutate(
      {
        path: pathname,
        purchase_hash: getCookie(USER_PURCHASE_HASH_KEY) || '',
      },
      {
        onSuccess: ({ data }) => {
          setIsOpen(true);
          if (!data) throw new Error('공유할 수 없는 콘텐츠입니다.');
          const newUrl = `${window.location.origin}${pathname}?share_code=${data}`;
          setUrl(newUrl);
        },
        onError: () => {
          setUrl('');
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 다시 시도해주세요.',
            handleConfirm: handleReset,
          });
        },
      }
    );
  };

  const renderShare = () => (
    <>
      <ShareComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        url={url}
        kakaoOptions={kakaoOptions}
      />
      {renderMessage()}
    </>
  );

  return {
    handleShare,
    renderShare,
  };
}

export default useShare;

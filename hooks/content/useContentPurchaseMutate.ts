import { useMutation } from '@tanstack/react-query';
import { fetchContentPurchase } from '@module/api/content';
import { getErrorMessage } from '@module/utils/content/message';
import { ContentDetailT } from '@module/types/content/detail';
import { ContentPurchaseRequest } from '@module/types/content/purchase';

interface Props {
  content: ContentDetailT;
  setAlertOptions: (options: any) => void;
}

function useContentPurchaseMutate({ setAlertOptions }: Props) {
  return useMutation(
    (params: ContentPurchaseRequest) => fetchContentPurchase(params),
    {
      onError: (err: any) => {
        setAlertOptions({
          isOpen: true,
          description: getErrorMessage(err),
          handleConfirm: () => {
            setAlertOptions({ isOpen: false });
          },
        });
      },
    }
  );
}

export default useContentPurchaseMutate;

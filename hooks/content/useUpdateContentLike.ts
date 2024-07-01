import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { fetchUpdateContentLike } from '@module/api/content';
import { ContentDetailT } from '@module/types/content/detail';
import { contentLikeSelector } from '@module/store/content/like';

interface Props {
  content: ContentDetailT;
  setAlertOptions: (options: any) => void;
  handleReset: () => void;
  isUpdateQuery?: boolean;
}

function useUpdateContentLike({
  content,
  setAlertOptions,
  handleReset,
  isUpdateQuery,
}: Props) {
  const queryClient = useQueryClient();
  const likeMutate = useMutation(fetchUpdateContentLike);
  const [isLike, setIsLike] = useRecoilState(contentLikeSelector(content.id));

  const handleUpdateLike = () => {
    if (likeMutate.isLoading || isLike) return;

    likeMutate.mutate(
      {
        content_id: content.id,
      },
      {
        onSuccess: ({ data: { like_count } }) => {
          setIsLike(true);
          if (isUpdateQuery) {
            queryClient.setQueryData(
              ['contentDetail', { id: content.id }],
              (oldData: any) => ({
                data: {
                  ...oldData.data,
                  like_count,
                },
              })
            );
          }
        },
        onError: () => {
          setAlertOptions({
            isOpen: true,
            description: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            handleConfirm: handleReset,
          });
        },
      }
    );
  };

  return { handleUpdateLike };
}

export default useUpdateContentLike;

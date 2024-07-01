import { useQuery } from '@tanstack/react-query';
import { fetchContentList } from '@module/api/content/list';
import { ContentListLimitRequest } from '@module/types/content/list';

function useContentList({ limit, position }: ContentListLimitRequest) {
  return useQuery(
    ['contentList', { limit, position }],
    () => fetchContentList({ limit, position }),
    {
      select: res => res.data,
      initialData: () => ({
        data: [],
      }),
    }
  );
}

export default useContentList;

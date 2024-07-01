import { instance } from '@module/utils/axios';
import {
  ContentRelatedListResponse,
  ContentStatusRelatedRequest,
  ContentRecommendResponse,
} from '@module/types/content/detail';

const fetchContentCategoryRelated = async (id: number) => {
  const { data } = await instance.get<ContentRelatedListResponse>(
    `/contents/${id}/related`
  );
  return data;
};

const fetchContentStatusRelated = async (
  params: ContentStatusRelatedRequest
) => {
  const { data } = await instance.get<ContentRelatedListResponse>(
    `/contents/status`,
    {
      params,
    }
  );
  return data;
};

const fetchContentRecommend = async () => {
  const { data } =
    await instance.get<ContentRecommendResponse>(`/contents/recommend`);
  return data;
};

export {
  fetchContentCategoryRelated,
  fetchContentStatusRelated,
  fetchContentRecommend,
};

import { instance } from '@module/utils/axios';
import {
  ContentShowRequest,
  ContentShowResponse,
} from '@module/types/content/detail';
import {
  ContentPurchaseRequest,
  ContentPurchaseResponse,
} from '@module/types/content/purchase';
import {
  ContentResultRequest,
  ContentResultResponse,
} from '@module/types/content/result';
import {
  UpdateContentLikeRequest,
  UpdateContentLikeResponse,
} from '@module/types/content/like';

/**
 * 콘텐츠 상세
 */
const fetchContentDetail = async ({ id }: ContentShowRequest) => {
  const { data } = await instance.get<ContentShowResponse>(`/contents/${id}`);
  return data;
};

/**
 * 콘텐츠 구매
 */
const fetchContentPurchase = async (params: ContentPurchaseRequest) => {
  const { data } = await instance.post<ContentPurchaseResponse>(
    `/purchases`,
    params
  );
  return data;
};

const fetchContentResult = async ({ id, ...params }: ContentResultRequest) => {
  const { data } = await instance.post<ContentResultResponse>(
    `/purchases/${id}`,
    params
  );
  return data;
};

/**
 * 콘텐츠 소제목 미리보기
 */
const fetchContentPreview = async (id: number) => {
  const { data } = await instance.get(`/contents/${id}/previews`);
  return data;
};

/**
 * 콘텐츠, 좋아요 증가
 */
const fetchUpdateContentLike = async ({
  content_id,
}: UpdateContentLikeRequest) => {
  const { data } = await instance.post<UpdateContentLikeResponse>(
    `/contents/${content_id}/likes`
  );
  return data;
};

/**
 * 콘텐츠 생년월일 검증
 */

const fetchContentVerify = async (params: ContentPurchaseRequest) => {
  const { data } = await instance.post<{
    verify: boolean;
  }>(`/purchases/verify`, params);
  return data;
};

export {
  fetchContentDetail,
  fetchContentPurchase,
  fetchContentResult,
  fetchContentPreview,
  fetchUpdateContentLike,
  fetchContentVerify,
};

import { instance } from '@module/utils/axios';
import {
  FeedbackShowRequest,
  FeedbackShowResponse,
  FeedbackStoreRequest,
  FeedbackStoreResponse,
} from '@module/types/content/feedback';

const fetchFeedbacks = async ({
  content_id,
  ...params
}: FeedbackShowRequest) => {
  const { data } = await instance.get<FeedbackShowResponse>(
    `/contents/${content_id}/feedback`,
    {
      params,
    }
  );
  return data;
};

const fetchFeedbackStore = async ({
  purchase_id,
  ...params
}: FeedbackStoreRequest) => {
  const { data } = await instance.post<FeedbackStoreResponse>(
    `/purchases/${purchase_id}/feedback`,
    params
  );
  return data;
};

export { fetchFeedbacks, fetchFeedbackStore };

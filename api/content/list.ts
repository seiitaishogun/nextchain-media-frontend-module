import {
  ContentListRequest,
  ContentListLimitRequest,
  ContentListResponse,
  ContentListLimitResponse
} from '@module/types/content/list';
import { instance } from '@module/utils/axios';

const fetchContentAll = async (params: ContentListRequest) => {
  const { data } = await instance.get<ContentListResponse>(`/contents/all`, {
    params,
  });
  return data;
};

const fetchContentList = async (params: ContentListLimitRequest) => {
  const { data } = await instance.get<ContentListLimitResponse>(`/contents/list`, {
    params,
  });
  return data;
};

export { fetchContentAll, fetchContentList };

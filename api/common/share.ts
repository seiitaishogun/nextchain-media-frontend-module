import {
  ContentShareRequest,
  ContentShareResponse,
} from '@module/types/content/share';
import { instance } from '@module/utils/axios';

/**
 * 공유 하기
 */
const fetchShare = async (params: ContentShareRequest) => {
  const { data } = await instance.get<ContentShareResponse>(`/common/share`, {
    params,
  });
  return data;
};

export { fetchShare };

import { instance } from '@module/utils/axios';
import {
  ContentReplayHashRequest,
  ContentReplayHashResponse,
  ContentReplayListRequest,
  ContentReplayListResponse,
} from '@module/types/content/replay';

const fetchContentReplayList = async (params: ContentReplayListRequest) => {
  const { data } = await instance.get<ContentReplayListResponse>(
    `/contents/replays`,
    {
      params,
    }
  );
  return data;
};

const fetchContentReplayHash = async (params: ContentReplayHashRequest) => {
  const { data } = await instance.post<ContentReplayHashResponse>(
    `/contents/replays/hash`,
    params
  );
  return data;
};

export { fetchContentReplayList, fetchContentReplayHash };

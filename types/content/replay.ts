import { TagT } from '@module/types/common';
import { CommonListT } from '@module/types/common/list';

interface ContentReplayHashRequest {
  name: string;
  phone: string;
  pin: string;
}

interface ContentReplayHashResponse {
  data: {
    purchase_hash: string;
  };
}

interface ContentReplayListT {
  id: number;
  category: string | null;
  type: string | null;
  tags: TagT | null;
  thumbnail: string | null;
  thumbnail_large: string | null;
  name: string;
  summary: string;
  contents: string;
  view_count: number;
  like_count: number;
  share_count: number;
  available_at: number;
}

interface ContentReplayListRequest {
  page: number;
  purchase_hash: string;
}

interface ContentReplayListResponse {
  data: CommonListT<ContentReplayListT>;
}

export type {
  ContentReplayHashRequest,
  ContentReplayHashResponse,
  ContentReplayListRequest,
  ContentReplayListResponse,
  ContentReplayListT,
};

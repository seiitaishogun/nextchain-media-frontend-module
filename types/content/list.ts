import { CommonListT } from '@module/types/common/list';

interface ContentListT {
  id: number;
  name: string;
  summary: string;
  thumbnail: string | null;
  view_count: number;
  like_count: number;
}

interface ContentListRequest {
  page: number;
}

interface ContentListLimitRequest {
  position?: number;
  limit: number;
}

interface ContentListLimit {
  id: number;
  name: string;
  thumbnail: string;
  contents: string;
  category: string;
  type_description: string;
}

interface ContentListLimitResponse {
  data: ContentListLimit[];
}

interface ContentListResponse {
  data: CommonListT<ContentListT>;
}

export type {
  ContentListT,
  ContentListRequest,
  ContentListLimitRequest,
  ContentListLimit,
  ContentListResponse,
  ContentListLimitResponse,
};

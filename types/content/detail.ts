import { ContentTypeT } from '@module/types/content';
import { TagT } from '@module/types/common';
import { CategoryT } from '@module/types/category';

interface ContentTarotT {
  name: string;
  is_straight: boolean;
}

interface ContentDetailT {
  banner: string | null;
  banner_mobile: string | null;
  category: CategoryT | null;
  contents: string;
  id: number;
  is_partner: boolean;
  is_skip: boolean;
  like_count: number;
  name: string;
  price: number;
  discount_price: number;
  discount_percent: number;
  is_discount: boolean;
  sample: string | null;
  sample_mobile: string | null;
  share_count: number;
  summary: string;
  tags: TagT[];
  tarot: ContentTarotT[];
  tarot_count: number;
  thumbnail: string | null;
  type: ContentTypeT;
  view_count: number;
}

/**
 * 컨텐츠 상세 정보 API Response
 */
interface ContentShowRequest {
  id: number;
}
interface ContentStatusRelatedRequest {
  discount_price?: number | null;
  is_new?: number | null;
  is_hot?: number | null;
}
/**
 * 컨텐츠 상세 정보 API Response
 */

interface ContentShowResponse {
  data: ContentDetailT;
}

interface ContentRelatedList {
  id: number;
  category: string;
  type: string;
  name: string;
  summary: string;
  banner: string;
  banner_mobile: string;
  thumbnail: string;
  price: number;
  discount_price: number;
  discount_percent: number;
  is_discount: boolean;
  view_count: number;
}

interface ContentRecommendList extends ContentRelatedList {
  category_id: number;
  category_name: string;
  contents: string;
}

interface ContentRelatedListResponse {
  data: ContentRelatedList[];
}

interface ContentRecommendResponse {
  data: ContentRecommendList[];
}

export type {
  ContentTarotT,
  ContentDetailT,
  ContentShowRequest,
  ContentShowResponse,
  ContentStatusRelatedRequest,
  ContentRelatedList,
  ContentRelatedListResponse,
  ContentRecommendList,
  ContentRecommendResponse,
};

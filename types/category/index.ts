import { CommonListT } from '@module/types/common/list';

interface CategoryT {
  id: number;
  name: string;
  status: 0 | 1 | 2;
}

interface CategoryListT {
  id: number;
  name: string;
  summary: string;
  thumbnail: string | null;
  price: number;
  is_new: boolean;
  is_hot: boolean;
  view_count: number;
  like_count: number;
}

interface CategoriesResponse {
  data: CategoryT[];
}

interface CategoryListRequest {
  id: number;
  page: number;
}

interface CategoryListResponse {
  data: CommonListT<CategoryListT>;
}

export type {
  CategoryT,
  CategoriesResponse,
  CategoryListT,
  CategoryListRequest,
  CategoryListResponse,
};

import { instance } from '@module/utils/axios';
import {
  CategoryListRequest,
  CategoryListResponse,
  CategoriesResponse,
} from '@module/types/category';

const fetchCategories = async () => {
  const { data } = await instance.get<CategoriesResponse>(`/common/categories`);
  return data;
};

const fetchCategoryList = async ({ id }: CategoryListRequest) => {
  const { data } = await instance.get<CategoryListResponse>(
    `/contents/categories/${id}`
  );
  return data;
};

export { fetchCategories, fetchCategoryList };

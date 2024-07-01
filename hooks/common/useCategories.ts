import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@module/api/category';

function useCategories() {
  const checkIsNew = (status: number) => status === 1;

  const checkIsFree = (status: number) => status === 2;

  const checkIsSale = (status: number) => status === 3;

  const { data } = useQuery(['categories'], fetchCategories, {
    initialData: {
      data: [],
    },
    select: res =>
      res.data.map(item => ({
        ...item,
        is_new: checkIsNew(item.status),
        is_free: checkIsFree(item.status),
        is_sale: checkIsSale(item.status),
      })),
    // suspense: true,
  });

  return data;
}

export default useCategories;

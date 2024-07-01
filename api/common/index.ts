import { instance } from '@module/utils/axios';

const fetchTags = async () => {
  const { data } = await instance.get(`/common/tags`);
  return data;
};

const fetchAccessCheck = async (params: { path: string }) => {
  const { data } = await instance.get('/accesscheck', { params });
  return data;
};

export { fetchTags, fetchAccessCheck };

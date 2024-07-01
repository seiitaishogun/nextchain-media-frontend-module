import { instance } from '@module/utils/axios';
import { MainContentResponse } from '@module/types/main';

/**
 * 재물운 컨텐츠
 */
const fetchMainMoney = async () => {
  const { data } =
    await instance.get<MainContentResponse>(`/contents/main/money`);
  return data;
};

/**
 * 종합운세 컨텐츠
 */
const fetchMainGeneral = async () => {
  const { data } = await instance.get<MainContentResponse>(
    `/contents/main/general`
  );
  return data;
};

/**
 * top5 컨텐츠
 */
const fetchMainTop = async () => {
  const { data } =
    await instance.get<MainContentResponse>(`/contents/main/top`);
  return data;
};

/**
 * 건강운 컨텐츠
 */
const fetchMainHealth = async () => {
  const { data } = await instance.get<MainContentResponse>(
    `/contents/main/health`
  );
  return data;
};

/**
 * 애정운 컨텐츠
 */
const fetchMainLove = async () => {
  const { data } =
    await instance.get<MainContentResponse>(`/contents/main/love`);
  return data;
};

/**
 * 오늘의 컨텐츠
 */
const fetchMainToday = async () => {
  const { data } =
    await instance.get<MainContentResponse>(`/contents/main/today`);
  return data;
};

export {
  fetchMainMoney,
  fetchMainGeneral,
  fetchMainTop,
  fetchMainHealth,
  fetchMainLove,
  fetchMainToday,
};

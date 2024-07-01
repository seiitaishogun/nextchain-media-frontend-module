import axios, { InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const ACCESS_TOKEN = getCookie('access_token');
const baseURL = process.env.APP_API_URL;
const headers = {
  Accept: 'application/json',
  Authorization: ACCESS_TOKEN ? `Bearer ${ACCESS_TOKEN}` : undefined,
};
const setLoginToken = (access_token: string) => {
  setCookie('access_token', access_token, {
    expires: new Date(2050, 0, 1),
  });
};

const instanceWithAuth = (config: InternalAxiosRequestConfig<any>) => {
  const newConfig = config;
  const token = getCookie('access_token');

  newConfig.headers.Accept = 'application/json';
  newConfig.headers.Authorization = `Bearer ${token}`;
  return newConfig;
};

const instance = axios.create({
  baseURL,
  headers,
});
instance.interceptors.request.use(instanceWithAuth);

export { instance, setLoginToken, ACCESS_TOKEN };

import axios, { isAxiosError } from "axios";
import { notifyApiError } from "../errors/notifyApiError";

export const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL;
  if (typeof url !== "string")
    throw new Error(`VITE_API_URL should be a valid string`);
  return url;
};

export const TOKEN_STORAGE_KEY = "token";

export const setToken = (newToken: string) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, newToken);
};

const privateAxios = axios.create({
  baseURL: getApiUrl(),
});

privateAxios.interceptors.request.use((axiosConfig) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  axiosConfig.headers.Authorization = `Bearer ${token}`;

  return axiosConfig;
});

privateAxios.interceptors.response.use(undefined, (error) => {
  if (isAxiosError(error)) {
    notifyApiError(error.response?.data);
  }
  throw error;
});

export default privateAxios;

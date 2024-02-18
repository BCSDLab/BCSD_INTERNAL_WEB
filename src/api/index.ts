import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_PATH } from 'config/constants';

interface HttpClientType extends AxiosInstance {
  get<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
}

const accessClient: HttpClientType = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

accessClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
);

accessClient.interceptors.response.use(
  (response) => response.data,
);

export { accessClient };

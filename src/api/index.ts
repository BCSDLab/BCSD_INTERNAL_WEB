import axios from 'axios';
import { API_PATH } from 'config/constants';

const accessClient = axios.create({
  baseURL: `${API_PATH}`,
  timeout: 2000,
});

accessClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }
    return config;
  },
);

accessClient.interceptors.response.use(
  (response) => response.data
)


export { accessClient };
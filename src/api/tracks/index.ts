import { accessClient } from 'api';

export const getTracks = async () => {
  const { data } = await accessClient.get('/tracks');
  return data;
};

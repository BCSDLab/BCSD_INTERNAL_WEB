import { accessClient } from 'api';
import { Track } from 'model/member';

export const getTracks = () => {
  return accessClient.get<Track[]>('/tracks');
};

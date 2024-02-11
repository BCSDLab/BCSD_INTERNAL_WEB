import { accessClient } from 'api';
import { Track } from 'model/track';

export const getTracks = () => {
  return accessClient.get<Track[]>('/tracks');
};

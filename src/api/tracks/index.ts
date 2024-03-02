import { accessClient } from 'api';
import { Track, TrackUpdate } from 'model/track';

export const getTracks = () => {
  return accessClient.get<Track[]>('/tracks');
};

export const updateTrack = (trackId: number, track: TrackUpdate) => {
  return accessClient.put<TrackUpdate>(`/tracks/${trackId}`, track);
};

export const deleteTrack = (trackId: number) => {
  return accessClient.delete(`/tracks/${trackId}`);
};

export const createTrack = (track: TrackUpdate) => {
  return accessClient.post<TrackUpdate>('/tracks', track);
};

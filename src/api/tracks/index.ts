import { accessClient } from 'api';
import { Track, TrackUpdate } from 'model/track';

export const getTracks = () => accessClient.get<Track[]>('/tracks');

export const updateTrack = (trackId: number, track: TrackUpdate) => accessClient.put<TrackUpdate>(`/tracks/${trackId}`, track);

export const deleteTrack = (trackId: number) => accessClient.delete(`/tracks/${trackId}`);

export const createTrack = (track: TrackUpdate) => accessClient.post<TrackUpdate>('/tracks', track);

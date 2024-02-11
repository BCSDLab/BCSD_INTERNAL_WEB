import { create } from 'zustand';

interface TrackStore {
  id: number;
  name: string;
  setName: (name: string) => void;
  setTrack: (id:number, name: string) => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
  id: 0,
  name: '',
  setName: (name: string) => set({ name }),
  setTrack: (id:number, name: string) => set({ id, name }),
}));

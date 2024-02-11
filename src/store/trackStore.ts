import { create } from 'zustand';

interface TrackStore {
  id: number | null;
  name: string;
  setName: (name: string) => void;
  setTrack: (id:number | null, name: string) => void;
}

export const useTrackStore = create<TrackStore>((set) => ({
  id: null,
  name: 'ALL',
  setName: (name: string) => set({ name }),
  setTrack: (id:number | null, name: string) => set({ id, name }),
}));

import { getMe } from 'api/members';
import { create } from 'zustand';
import { Member } from 'model/member';

interface LoginState {
  me: Member | null;
  setMe: () => void;
  deleteMe: () => void;
}

export const useLoginState = create<LoginState>((set) => ({
  me: null,

  setMe: async () => {
    if (localStorage.getItem('accessToken')) {
      try {
        const user = await getMe();
        set({ me: user });
      } catch (error) {
        localStorage.removeItem('accessToken');
        set({ me: null });
      }
    }
  },
  deleteMe: () => {
    localStorage.removeItem('accessToken');
    set({ me: null });
  },
}));

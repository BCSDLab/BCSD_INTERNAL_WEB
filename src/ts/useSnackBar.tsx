import { AxiosError } from 'axios';
import { create } from 'zustand';

interface SnackBar {
  showSnackBar: boolean,
  message: string,
  open: () => void,
  close: () => void,
  setMessage: (errorMessage: string) => void
}

interface AxiosErrorMessage {
  message: string
}

export const useStore = create<SnackBar>((set) => ({
  showSnackBar: false,
  message: '',
  open: () => set({ showSnackBar: true }),
  close: () => set({ showSnackBar: false }),
  setMessage: (message: string) => set({ message }),
}));

export const useSnackBar = () => {
  const { open, setMessage } = useStore();
  const onError = (e: unknown) => {
    const err = e as AxiosError;
    const { message } = (err.response?.data as AxiosErrorMessage);
    setMessage(message);
    open();
  };

  return onError;
};

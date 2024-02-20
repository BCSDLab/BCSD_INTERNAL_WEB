import { create } from 'zustand';

interface SnackBar {
  showSnackBar: boolean,
  message: string,
  type: SnackBarType,
  open: () => void,
  close: () => void,
  setMessage: (errorMessage: string) => void,
  setType: (type: SnackBarType) => void
}

type SnackBarType = 'error' | 'success' | 'warning' | 'info';

export interface SnackBarParam {
  type: SnackBarType,
  message: string,
}

export const useStore = create<SnackBar>((set) => ({
  showSnackBar: false,
  message: '',
  type: 'info',
  open: () => set({ showSnackBar: true }),
  close: () => set({ showSnackBar: false }),
  setMessage: (message: string) => set({ message }),
  setType: (type: SnackBarType) => set({ type }),
}));

export const useSnackBar = () => {
  const { open, setMessage, setType } = useStore();

  const openSnackBar = ({ type, message }: SnackBarParam) => {
    setType(type);
    setMessage(message);
    open();
  };

  return openSnackBar;
};

import { useStore } from 'ts/useSnackBar';
import Snackbar from '@mui/material/Snackbar';

export default function SnackBar() {
  const { showSnackBar, message, close } = useStore();

  return (
    <div>
      {showSnackBar && message}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        message={message}
        onClose={close}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </div>
  );
}

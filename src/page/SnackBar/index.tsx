import { useStore } from 'ts/useSnackBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar() {
  const {
    showSnackBar, message, close, type,
  } = useStore();

  return (
    <div>
      {showSnackBar && message}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={close}
          severity={type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

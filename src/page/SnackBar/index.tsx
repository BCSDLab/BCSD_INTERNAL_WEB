import { useStore } from 'ts/useSnackBar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SnackBar() {
  const {
    showSnackBar, message, close, type,
  } = useStore();

  return (
    <div>
      <Snackbar
        open={showSnackBar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={close}
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

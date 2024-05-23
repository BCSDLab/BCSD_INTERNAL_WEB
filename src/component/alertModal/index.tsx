import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertModalProps {
  isOpen: boolean;
  description: string;
  onConfirm: () => any;
  setAlert: (state: boolean) => void;
}

export default function AlertDialog({
  isOpen, description, onConfirm, setAlert,
}: AlertModalProps) {
  const handleClose = () => {
    setAlert(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {description}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button
          onClick={() => {
            onConfirm();
            handleClose();
          }}
        >
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}

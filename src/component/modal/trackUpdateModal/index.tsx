import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { useState } from 'react';
import { useUpdateTrack } from 'query/tracks';
import * as S from './style';

interface MemberInfoModalProps {
  open: boolean;
  onClose: () => void;
  trackId: number | null;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function TrackUpdateModal({ open, onClose, trackId }: MemberInfoModalProps): React.ReactElement {
  const [track, setTrack] = useState({
    name: '',
  });
  const { mutate: updateTrack } = useUpdateTrack();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTrack({
      ...track,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (trackId) {
      updateTrack({ id: trackId, updatedTrack: track });
    }
    onClose();
    setTrack({
      name: '',
    });
  };

  const handleClose = () => {
    onClose();
    setTrack({
      name: '',
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          트랙 수정
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            label="트랙명"
            name="name"
            value={track.name}
            fullWidth
            onChange={handleChange}
          />
          <div css={S.buttonContainer}>
            <div css={S.buttonWrapper}>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="contained"
                onClick={handleSave}
              >
                저장
              </Button>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="outlined"
                onClick={handleClose}
              >
                닫기
              </Button>
            </div>

          </div>
        </Box>
      </Box>
    </Modal>
  );
}

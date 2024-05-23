import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { useState, memo } from 'react';
import { useCreateTeam } from 'query/teams';
import * as S from './style';

interface CreateModalProps {
  open: boolean;
  onClose: () => void;
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

const TeamCreateModal = memo(({ open, onClose }: CreateModalProps) => {
  const [teamName, setTeamName] = useState('');
  const { mutate: createTeam } = useCreateTeam();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeamName(value);
  };

  const handleSave = () => {
    createTeam(teamName);
    onClose();
    setTeamName('');
  };

  const handleClose = () => {
    onClose();
    setTeamName('');
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
          팀 생성
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            label="팀명"
            name="name"
            value={teamName}
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
});

export default TeamCreateModal;

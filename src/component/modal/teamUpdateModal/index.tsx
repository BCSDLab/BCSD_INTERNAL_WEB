import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteTeam, useUpdateTeam } from 'query/teams';
import * as S from './style';

interface MemberInfoModalProps {
  open: boolean;
  onClose: () => void;
  teamId: number | null;
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

export default function TeamInfoModal({ open, onClose, teamId }: MemberInfoModalProps): React.ReactElement {
  const [team, setTeam] = useState({
    name: '',
  });
  const { mutate: updateTeam } = useUpdateTeam();
  const { mutate: deleteTeam } = useDeleteTeam();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTeam({
      ...team,
      [name]: value,
    });
  };

  const handleSave = () => {
    if (team && teamId) {
      updateTeam({ id: teamId, name: team.name, isDeleted: false });
    }
    onClose();
    setTeam({
      name: '',
    });
  };

  const handleClose = () => {
    onClose();
    setTeam({
      name: '',
    });
  };

  const handleDeleteTeam = (id: number) => {
    if (id) {
      deleteTeam(id);
    }
    onClose();
  };

  useEffect(
    () => {
      if (teamId) {
        setTeam({
          name: team.name,
        });
      }
    },
    [team.name, teamId],
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          팀명 수정
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            label="팀명"
            name="name"
            value={team.name}
            fullWidth
            onChange={handleChange}
          />
          <div css={S.buttonContainer}>
            <div css={S.buttonWrapper}>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="outlined"
                color="secondary"
                onClick={() => handleDeleteTeam(teamId!)}
              >
                삭제
              </Button>
            </div>
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

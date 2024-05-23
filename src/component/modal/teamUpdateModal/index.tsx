import {
  Box, Button, List, ListItemButton, Modal, TextField, Typography,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import {
  useDeleteTeam, useDeleteTeamMember, useGetTeamMembers, useUpdateTeam,
} from 'query/teams';
import AlertDialog from 'component/alertModal';

import * as S from './style';

interface MemberInfoModalProps {
  open: boolean;
  onClose: () => void;
  teamName: string;
  teamId: number;
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

const TeamInfoModal = memo(({
  open, onClose, teamName, teamId,
}: MemberInfoModalProps) => {
  const [team, setTeam] = useState(teamName);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const { mutate: updateTeam } = useUpdateTeam();
  const { mutate: deleteTeam } = useDeleteTeam();
  const { mutate: deleteMemberByTeam } = useDeleteTeamMember();
  const { data: teamMembers } = useGetTeamMembers(teamId);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTeam(value);
  };

  const handleSave = () => {
    if (team && teamId) {
      updateTeam({ id: teamId, name: team, isDeleted: false });
    }
    onClose();
    setTeam('');
  };

  const handleClose = () => {
    onClose();
    setTeam('');
    setAlertOpen(false);
    setSelectedMember(null);
  };

  const handleDeleteTeam = (id: number) => {
    if (id) {
      deleteTeam(id);
    }
    onClose();
  };

  const handleDeleteMember = () => {
    if (selectedMember !== null) {
      deleteMemberByTeam({ teamId, memberId: selectedMember });
    }
  };

  useEffect(
    () => {
      if (teamId) {
        setTeam(teamName);
      }
    },
    [teamName, teamId],
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
            value={team}
            fullWidth
            onChange={handleChange}
          />
          <div css={S.buttonContainer}>
            <div css={S.buttonWrapper}>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="contained"
                color="error"
                onClick={() => handleDeleteTeam(teamId)}
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
        <Box>
          <Typography gutterBottom variant="h5">
            팀장 🍊
          </Typography>
          <Box sx={S.teamMemberList}>
            <List>
              {teamMembers?.filter((member) => member.isLeader === true)
                .map((teamMember) => (
                  <ListItemButton
                    key={teamMember.memberResponse?.id}
                    sx={S.listButton}
                    onClick={() => {
                      setSelectedMember(teamMember.memberResponse!.id);
                      setAlertOpen(true);
                    }}
                  >
                    {teamMember.memberResponse?.name}
                    _
                    {teamMember.memberResponse?.track.name}
                  </ListItemButton>
                ))}
            </List>
          </Box>
          <Box>
            <Typography gutterBottom variant="h5">
              팀원 🐜
            </Typography>
            <Box sx={S.teamMemberList}>
              <List>
                {teamMembers?.map((teamMember) => (
                  <ListItemButton
                    key={teamMember.memberResponse?.id}
                    sx={S.listButton}
                    onClick={() => {
                      setSelectedMember(teamMember.memberResponse!.id);
                      setAlertOpen(true);
                    }}
                  >
                    {teamMember.memberResponse?.name}
                    _
                    {teamMember.memberResponse?.track.name}
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Box>
          <AlertDialog
            isOpen={alertOpen}
            description="정말 삭제하시겠어요?"
            onConfirm={handleDeleteMember}
            setAlert={setAlertOpen}
          />
        </Box>
      </Box>
    </Modal>
  );
});

export default TeamInfoModal;

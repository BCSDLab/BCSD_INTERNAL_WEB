import {
  Typography, Grid, Paper, Button,
} from '@mui/material';
import { useGetTeams, useGetTeamsMembers } from 'query/teams';
import { Team } from 'model/team';
import { useCallback, useState, useMemo } from 'react';
import SearchModal from 'component/modal/teamAddMemberModal';
import TeamCreateModal from 'component/modal/teamCreateModal';
import TeamInfoModal from 'component/modal/teamUpdateModal';
import { useGetMe } from 'query/members';

import * as S from './style';

type ModalKind = 'searchModal' | 'teamCreateModal' | 'teamUpdateModal' | null;

interface SelectedTeam {
  teamId: number;
  teamName: string;
}

export default function TeamInfo() {
  const { data: teams } = useGetTeams();
  const { data: teamMembers } = useGetTeamsMembers();
  const { data: getMe } = useGetMe();

  // Modal Open Close를 관리
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [openTeamCreateModal, setOpenTeamCreateModal] = useState(false);
  const [openTeamUpdateModal, setOpenTeamUpdateModal] = useState(false);

  const [modalTarget, setModaltarget] = useState<ModalKind>(null);
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>({ teamId: 0, teamName: '' });
  const [isLeaderSelect, setIsLeaderSelect] = useState(false);

  const handleOpen = useCallback((target: ModalKind) => {
    if (target === 'searchModal') {
      setOpenSearchModal(true);
    } else if (target === 'teamCreateModal') {
      setOpenTeamCreateModal(true);
    } else if (target === 'teamUpdateModal') {
      setOpenTeamUpdateModal(true);
    }
    setModaltarget(target);
  }, []);

  const handleClose = useCallback(() => {
    if (modalTarget === 'searchModal') {
      setOpenSearchModal(false);
    } else if (modalTarget === 'teamCreateModal') {
      setOpenTeamCreateModal(false);
    } else if (modalTarget === 'teamUpdateModal') {
      setOpenTeamUpdateModal(false);
    }
    setIsLeaderSelect(false);
  }, [modalTarget]);

  const renderTeams = useMemo(() => (
    teams?.map((team: Team) => (
      <Paper
        key={team.id}
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 800,
          flexGrow: 1,
          marginBottom: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs css={S.teamContainer}>
                <Typography gutterBottom variant="h4">
                  {team.name}
                  {' '}
                  Team
                </Typography>
                <Typography gutterBottom variant="h5">
                  팀장 🍊
                </Typography>
                <div css={S.teamMembers}>
                  {teamMembers?.filter((teamMember) => teamMember.teamId === team.id && teamMember.isLeader === true)
                    .map((leader) => (
                      <Typography variant="body1" key={leader.id}>
                        {leader.memberResponse?.name}
                        _
                        {leader.memberResponse?.track.name}
                      </Typography>
                    ))}
                </div>
                <Typography gutterBottom variant="h5">
                  팀원 🐜
                </Typography>
                <div css={S.teamMembers}>
                  {teamMembers?.filter((teamMember) => teamMember.teamId === team.id && teamMember.isLeader === false)
                    .map((teamMember) => (
                      <Typography
                        variant="body1"
                        key={teamMember.memberResponse?.id}
                      >
                        {teamMember.memberResponse?.name}
                        _
                        {teamMember.memberResponse?.track.name}
                      </Typography>
                    ))}
                </div>
                {(getMe.authority === 'ADMIN' || getMe.authority === 'MANAGER') && (
                  <Grid css={S.teamBottom}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={S.teamBottomButton}
                      onClick={() => {
                        setSelectedTeam({ teamId: team.id, teamName: team.name });
                        setIsLeaderSelect(true);
                        handleOpen('searchModal');
                      }}
                    >
                      팀장 추가하기
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={S.teamBottomButton}
                      onClick={() => {
                        setSelectedTeam({ teamId: team.id, teamName: team.name });
                        handleOpen('searchModal');
                      }}
                    >
                      팀원 추가하기
                    </Button>
                    <Button
                      variant="outlined"
                      color="info"
                      sx={S.teamBottomButton}
                      onClick={() => {
                        setSelectedTeam({ teamId: team.id, teamName: team.name });
                        handleOpen('teamUpdateModal');
                      }}
                    >
                      팀 관리하기
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ))
  ), [teams, teamMembers, getMe.authority, handleOpen]);

  return (
    <div css={S.container}>
      <SearchModal open={openSearchModal} onClose={handleClose} teamId={selectedTeam.teamId} isLeader={isLeaderSelect} />
      <TeamCreateModal open={openTeamCreateModal} onClose={handleClose} />
      <TeamInfoModal open={openTeamUpdateModal} onClose={handleClose} teamId={selectedTeam.teamId} teamName={selectedTeam.teamName} />
      {renderTeams}
      <Button
        variant="contained"
        color="info"
        sx={S.addTeamButton}
        onClick={() => {
          handleOpen('teamCreateModal');
        }}
      >
        팀 추가하기
      </Button>
    </div>
  );
}

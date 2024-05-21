import {
  Typography, Grid, Paper, Button,
} from '@mui/material';
import {
  useDeleteTeam, useDeleteTeamMember, useGetTeams, useGetTeamsMembers,
} from 'query/teams';
import { Team } from 'model/team';
import { useCallback, useState, useMemo } from 'react';
import SearchModal from 'component/modal/teamAddMemberModal';

import * as S from './style';

export default function TeamInfo() {
  const { data: teams } = useGetTeams();
  const { data: teamMembers } = useGetTeamsMembers();
  const [selectedTeam, setSelectedTeam] = useState(0);
  const { mutate: deleteTeam } = useDeleteTeam();
  const { mutate: deleteMemberByTeam } = useDeleteTeamMember();

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

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
                        onClick={() => {
                          deleteMemberByTeam({ teamId: team.id, memberId: teamMember.memberResponse!.id });
                        }}
                      >
                        {teamMember.memberResponse?.name}
                        _
                        {teamMember.memberResponse?.track.name}
                      </Typography>
                    ))}
                </div>
              </Grid>
              <Grid css={S.teamBottom}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setSelectedTeam(team.id);
                    handleOpen();
                  }}
                >
                  팀원 추가하기
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    deleteTeam(team.id);
                  }}
                >
                  팀 삭제하기
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    ))
  ), [teams, teamMembers, deleteMemberByTeam, handleOpen, deleteTeam]);

  return (
    <div css={S.container}>
      <SearchModal open={open} onClose={handleClose} teamId={selectedTeam} />
      {renderTeams}
    </div>
  );
}

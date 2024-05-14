import {
  Button, Grid, Paper, styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useGetTeams, useGetTeamsMembers } from 'query/teams';
import { Team } from 'model/team';
import { useState } from 'react';
import TeamInfoModal from 'component/modal/teamUpdateModal';
import { Member } from 'model/member';
import { useGetMe } from 'query/members';
import TeamCreateModal from 'component/modal/teamCreateModal';
import * as S from './style';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ':hover': {
    boxShadow: theme.shadows[4],
  },
}));

export default function TeamInfo() {
  const { data: teams } = useGetTeams();
  const { data: teamMembers } = useGetTeamsMembers();
  const [teamCreateModalOpen, setTeamCreateModalOpen] = useState(false);
  // TODO: 팀원 관리 모달 추가
  // const [teamMemberModalOpen, setTeamMemberModalOpen] = useState(false);
  const [teamInfoModalOpen, setTeamInfoModalOpen] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const { data: getMe } = useGetMe();
  const memberAuthority = getMe.authority;

  const handleOpenTeamCreateModal = () => {
    setTeamCreateModalOpen(true);
  };
  const handleCloseTeamCreateModal = () => {
    setTeamCreateModalOpen(false);
  };
  // TODO: 팀원 관리 모달 추가
  // const handleOpenTeamMemberModal = () => {
  //   setTeamMemberModalOpen(true);
  // };
  // const handleCloseTeamMemberModal = () => {
  //   setTeamMemberModalOpen(false);
  // };
  const handleOpenTeamInfoModal = () => {
    setTeamInfoModalOpen(true);
  };
  const handleCloseTeamInfoModal = () => {
    setTeamInfoModalOpen(false);
    setSelectedTeamId(null);
  };

  return (
    <div css={S.container}>
      <div css={S.contentContainer}>
        <Grid container spacing={2}>
          {teams?.map((team: Team) => (
            <Grid item xs={12} key={team.id} css={S.gridContainer}>
              <Item css={S.teamContainer}>
                <div css={S.teamTitle}>{team.name}</div>
                <div css={S.infoWrapper}>
                  <div css={S.fontBold}>팀장</div>
                </div>
                <div css={S.infoWrapper}>
                  {team.leaders.map((leader: Member) => (
                    <span key={leader.id}>{leader.name}</span>
                  ))}
                </div>
                <div css={S.infoWrapper}>
                  <span css={S.fontBold}>팀원</span>
                </div>
                <div css={S.infoWrapper}>
                  {teamMembers?.filter((teamMember) => teamMember.teamId === team.id && teamMember.isLeader === false)
                    .map((teamMember) => (
                      <span key={teamMember.id}>{teamMember.memberResponse?.name}</span>
                    ))}
                </div>
                <div css={S.infoWrapper}>
                  <Button variant="outlined" color="primary">팀원 관리</Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelectedTeamId(team.id);
                      handleOpenTeamInfoModal();
                    }}
                  >
                    팀정보 관리
                  </Button>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
        <TeamInfoModal open={teamInfoModalOpen} onClose={handleCloseTeamInfoModal} teamId={selectedTeamId} />
        <TeamCreateModal open={teamCreateModalOpen} onClose={handleCloseTeamCreateModal} />

      </div>
      <div css={S.createButtonContainer}>
        <div css={S.createButton}>
          {memberAuthority === 'ADMIN' || memberAuthority === 'MANAGER' ? (
            <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleOpenTeamCreateModal}>
              팀 생성
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

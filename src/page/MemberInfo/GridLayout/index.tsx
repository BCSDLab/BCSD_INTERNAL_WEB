import { useGetMe, useGetMembers, useGetMembersDeleted } from 'query/members';
import { useTrackStore } from 'store/trackStore';
import { Member, STATUS_LABEL } from 'model/member';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import MemberInfoModal from 'component/modal/memberInfoModal';
import { Paper, styled } from '@mui/material';
import * as S from './style';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ':hover': {
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
  },
}));

const STATUS_LIST = ['ATTEND', 'OFF', 'IPP', 'ARMY', 'COMPLETION', 'GRADUATE'] as const;

export default function GridLayout() {
  const defaultImageUrl = 'https://image.bcsdlab.com/default-profile.png';
  const { id } = useTrackStore();
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: id });
  const [modalOpen, setModalOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);
  const { data: membersDeleted } = useGetMembersDeleted({
    pageIndex: 0, pageSize: 1000, trackId: id,
  });
  const { data: getMe } = useGetMe();

  const handleOpenModal = () => {
    if (getMe.authority === 'ADMIN' || getMe.authority === 'MANAGER') {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div css={S.container}>
      <div css={S.memberContainer}>
        <Grid container spacing={3}>
          {members?.content.map((member: Member) => (
            <Grid item xs={3} key={member.id}>
              <Item
                css={S.memberContainer}
                onClick={() => {
                  setMemberInfo(member);
                  handleOpenModal();
                }}
              >
                <div css={S.memberWrapper}>
                  <div css={S.imageNameWrapper}>
                    <img css={S.image} src={member.profileImageUrl || defaultImageUrl} alt="profile" />
                    <div css={S.name}>{member.name}</div>
                  </div>
                  <div>
                    {STATUS_LABEL[member.status as keyof typeof STATUS_LABEL]}
                  </div>
                  <div>{member.memberType}</div>
                  <div>{member.studentNumber}</div>
                  <div>{member.company}</div>
                  <div>{member.department}</div>
                  <div>{member.phoneNumber}</div>
                  <div>{member.email}</div>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
      <MemberInfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        member={memberInfo}
        isList={false}
      />
    </div>

  );
}

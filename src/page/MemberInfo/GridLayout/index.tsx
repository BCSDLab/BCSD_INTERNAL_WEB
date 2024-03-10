import { useGetMe, useGetMembers, useGetMembersDeleted } from 'query/members';
import { useTrackStore } from 'store/trackStore';
import { Member, STATUS_LABEL } from 'model/member';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import MemberInfoModal from 'component/modal/memberInfoModal';
import { Paper, styled } from '@mui/material';
import { URLS } from 'const/urls';
import * as S from './style';

export const Item = styled(Paper)(({ theme }) => ({
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

interface ListLayoutProps {
  deleteMemberChecked: boolean;
}

export default function GridLayout({ deleteMemberChecked }: ListLayoutProps) {
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
          { deleteMemberChecked
            ? membersDeleted?.content.map((member: Member) => (
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
                      <img css={S.image} src={member.profileImageUrl || URLS.defaultProfile} alt="profile" />
                      <div css={S.name}>{member.name}</div>
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        상태
                      </div>
                      {STATUS_LABEL[member.status as keyof typeof STATUS_LABEL]}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        직책
                      </div>
                      {member.memberType}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        트랙
                      </div>
                      {member.track.name}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        학번
                      </div>
                      {member.studentNumber}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        소속
                      </div>
                      {member.company}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        학부
                      </div>
                      {member.department}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        전화번호
                      </div>
                      {member.phoneNumber}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        이메일
                      </div>
                      {member.email}
                    </div>
                  </div>
                </Item>
              </Grid>
            ))
            : members?.content.map((member: Member) => (
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
                      <img css={S.image} src={member.profileImageUrl || URLS.defaultProfile} alt="profile" />
                      <div css={S.name}>{member.name}</div>
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        상태
                      </div>
                      {STATUS_LABEL[member.status as keyof typeof STATUS_LABEL]}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        직위
                      </div>
                      {member.memberType}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        트랙
                      </div>
                      {member.track.name}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        학번
                      </div>
                      {member.studentNumber}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        소속
                      </div>
                      {member.company}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        학부
                      </div>
                      {member.department}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        전화번호
                      </div>
                      {member.phoneNumber}
                    </div>
                    <div>
                      <div css={S.memberInfoLabel}>
                        이메일
                      </div>
                      {member.email}
                    </div>
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

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
  inactiveMemberChecked: boolean;
}

interface MemberInfoField {
  label: string;
  getValue: (member: Member) => string;
  small?: boolean;
}

const MEMBER_FIELDS: MemberInfoField[] = [
  { label: '상태', getValue: (member) => STATUS_LABEL[member.status] },
  { label: '직책', getValue: (member) => member.memberType },
  { label: '트랙', getValue: (member) => member.track.name },
  { label: '학번', getValue: (member) => member.studentNumber },
  { label: '소속', getValue: (member) => member.company },
  { label: '학부', getValue: (member) => member.department },
  { label: '전화번호', getValue: (member) => member.phoneNumber },
  { label: '이메일', getValue: (member) => member.email, small: true },
];

export default function GridLayout({
  deleteMemberChecked,
  inactiveMemberChecked,
}: ListLayoutProps) {
  const { id } = useTrackStore();
  const { data: members } = useGetMembers({
    pageIndex: 0,
    pageSize: 1000,
    trackId: id,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);
  const { data: membersDeleted } = useGetMembersDeleted({
    pageIndex: 0,
    pageSize: 1000,
    trackId: id,
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
          {(deleteMemberChecked
            ? membersDeleted?.content
            : members?.content.filter((member: Member) => (inactiveMemberChecked ? !member.isActive : member.isActive))
          )?.map((member: Member) => (
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
                    <img
                      css={S.image}
                      src={member.profileImageUrl || URLS.defaultProfile}
                      alt="profile"
                    />
                    <div css={S.name}>{member.name}</div>
                  </div>
                  {MEMBER_FIELDS.map(({ label, getValue, small }) => (
                    <div key={label}>
                      <div css={S.memberInfoLabel}>{label}</div>
                      {small ? (
                        <div css={S.memberInfoLabelSmall}>
                          {getValue(member)}
                        </div>
                      ) : (
                        getValue(member)
                      )}
                    </div>
                  ))}
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

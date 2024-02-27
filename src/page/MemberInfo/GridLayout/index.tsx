import { useGetMembers, useGetMembersDeleted } from 'query/members';
import { useTrackStore } from 'store/trackStore';
import { Member, STATUS_LABEL } from 'model/member';
import Grid from '@mui/material/Grid';
import * as S from './style';

export default function GridLayout() {
  const { id } = useTrackStore();
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: id });
  const { data: membersDeleted } = useGetMembersDeleted({
    pageIndex: 0, pageSize: 1000, trackId: id,
  });
  return (
    <div css={S.container}>
      <div css={S.memberTypeContainer} />
      <div css={S.memberTypeContainer}>REGULAR</div>
      <div css={S.memberTypeContainer}>BEGINNER</div>
    </div>

  );
}

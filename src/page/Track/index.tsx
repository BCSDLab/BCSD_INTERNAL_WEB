import {
  Button, Grid, Paper, styled,
} from '@mui/material';
import { useTrackStore } from 'store/trackStore';
import { useGetTracks } from 'query/tracks';
import { Track } from 'model/track';
import AddIcon from '@mui/icons-material/Add';
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

export default function TrackInfo() {
  const { id } = useTrackStore();
  const { data: tracks } = useGetTracks();

  return (
    <div css={S.container}>
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>트랙정보</h1>
      </div>
      <div css={S.contentContainer}>
        <Grid container spacing={3}>
          {tracks?.map((track: Track) => (
            <Grid item xs={4} key={track.id} css={S.gridContainer}>
              <Item css={S.trackContainer}>
                <div css={S.trackTitle}>{track.name}</div>
                <div css={S.trackleaderWrapper}>
                  <div css={S.leaderTitle}>트랙장</div>
                  <div css={S.leaderName}>{track.leader === null ? '공석' : track.leader.name }</div>
                </div>
                <div css={S.trackControlButtonWrapper}>
                  <Button variant="outlined" color="primary">수정</Button>
                  <Button variant="outlined" color="secondary">삭제</Button>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
      <div css={S.createButtonContainer}>
        <div css={S.createButton}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
          >
            트랙 생성
          </Button>
        </div>
      </div>
    </div>
  );
}

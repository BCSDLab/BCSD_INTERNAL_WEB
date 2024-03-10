import {
  Button, Grid, Paper, styled,
} from '@mui/material';
import { useDeleteTrack, useGetTracks } from 'query/tracks';
import { Track } from 'model/track';
import AddIcon from '@mui/icons-material/Add';
import { URLS } from 'const/urls';
import { useGetMe } from 'query/members';
import TrackCreateModal from 'component/modal/trackCreateModal';
import { useState } from 'react';
import TrackUpdateModal from 'component/modal/trackUpdateModal';
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
  const { data: tracks } = useGetTracks();
  const { data: getMe } = useGetMe();
  const [trackCreateModalOpen, setMemberCreateModalOpen] = useState(false);
  const [trackUpdateModalOpen, setTrackUpdateModalOpen] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const memberAuthority = getMe.authority;
  const { mutate: deleteTrack } = useDeleteTrack();

  const handleOpenTrackCreateModal = () => {
    setMemberCreateModalOpen(true);
  };
  const handleCloseTrackCreateModal = () => {
    setMemberCreateModalOpen(false);
  };

  const handleOpenTrackUpdateModal = () => {
    setTrackUpdateModalOpen(true);
  };
  const handleCloseTrackUpdateModal = () => {
    setTrackUpdateModalOpen(false);
    setSelectedTrackId(null);
  };

  const handleDeleteTrack = (trackId: number) => {
    deleteTrack(trackId);
  };

  return (
    <div css={S.container}>
      <div css={S.contentContainer}>
        <Grid container spacing={3}>
          {tracks?.map((track: Track) => (
            <Grid item xs={3} key={track.id} css={S.gridContainer}>
              <Item css={S.trackContainer}>
                <div css={S.trackTitle}>{track.name}</div>
                <img
                  css={S.leaderProfileImage}
                  src={track.leader?.profileImageUrl || URLS.defaultProfile}
                  alt="profile"
                />
                <div css={S.trackleaderWrapper}>
                  <div css={S.leaderTitle}>트랙장</div>
                  <div css={S.leaderName}>
                    {track.leader === null ? '공석' : track.leader?.name}
                  </div>
                </div>
                <div>
                  {memberAuthority === 'ADMIN' || memberAuthority === 'MANAGER' ? (
                    <div css={S.trackControlButtonWrapper}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          setSelectedTrackId(track.id);
                          handleOpenTrackUpdateModal();
                        }}
                      >
                        수정
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDeleteTrack(track.id)}
                      >
                        삭제
                      </Button>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
        <TrackCreateModal
          open={trackCreateModalOpen}
          onClose={handleCloseTrackCreateModal}
        />
        <TrackUpdateModal
          open={trackUpdateModalOpen}
          onClose={handleCloseTrackUpdateModal}
          trackId={selectedTrackId}
        />
      </div>
      <div css={S.createButtonContainer}>
        <div css={S.createButton}>
          {memberAuthority === 'ADMIN' || memberAuthority === 'MANAGER' ? (
            <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleOpenTrackCreateModal}>
              트랙 생성
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

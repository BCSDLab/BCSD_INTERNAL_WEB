import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useGetTracks } from 'query/tracks';
import { useTrackStore } from 'store/trackStore';
import * as S from './style';

interface Track {
  id: number;
  name: string;
}

export default function TrackFilter() {
  const { name, setTrack, setName } = useTrackStore();
  const handleTrackChange = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setName(newAlignment);
  };
  const { data } = useGetTracks();
  const trackInit = [{ id: null, name: 'ALL' }, ...data];
  const tracks = trackInit.map((track: Track) => ({
    id: track.id,
    name: track.name,
  }));

  return (
    <div css={S.buttonContainer}>
      <ToggleButtonGroup
        color="primary"
        value={name}
        exclusive
        onChange={handleTrackChange}
        aria-label="Platform"
      >
        {tracks.map((track:Track) => (
          <ToggleButton
            key={track.id}
            value={track.name}
            sx={{ width: '100px' }}
            onClick={() => setTrack(track.id, track.name)}
          >
            {track.name}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

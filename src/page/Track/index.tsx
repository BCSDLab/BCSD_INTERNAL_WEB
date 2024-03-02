import { Grid, Paper, styled } from '@mui/material';
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

export default function Track() {
  return (
    <div css={S.container}>
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>트랙정보</h1>
      </div>

    </div>
  );
}

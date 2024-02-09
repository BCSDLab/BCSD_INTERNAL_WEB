import { Button } from '@mui/material';
import * as S from './style';

export default function DefaultLayout() {
  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="/src/assets/image/BCSD_logo-01.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>회원정보</Button>
      </div>
      <div css={S.content}>
        <div css={S.topBar}></div>
      </div>
    </div>
  );
}

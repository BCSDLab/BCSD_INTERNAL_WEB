import { Button } from '@mui/material';
import * as S from './style';

export default function DefaultLayout() {
  return (
    <div css={S.containerStyle}>
      <div css={S.sideBarStyle}>
        <img src="/src/assets/image/BCSD_logo-01.png" alt="logo" css={S.logoStyle} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>회원정보</Button>
      </div>
      <div css={S.contentStyle}>
        <div css={S.topBarStyle}></div>
      </div>
    </div>
  );
}

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function SideBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const toDues = () => {
    navigate('dues');
  };

  const toAccept = () => {
    navigate('accept');
  };

  const toMember = () => {
    navigate('member');
  };

  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={toMember}>회원정보</Button>
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }} onClick={toAccept}>회원승인</Button>
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }} onClick={toDues}>회비납부</Button>
        <Button variant="contained" color="secondary" sx={{ marginTop: '40vh' }} onClick={logOut}>로그아웃</Button>
      </div>
    </div>
  );
}

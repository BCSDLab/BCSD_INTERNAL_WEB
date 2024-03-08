import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

export default function SideBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('member')} css={S.button('20px')}>회원정보</Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('mypage')} css={S.button('60px')}>마이페이지</Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('accept')} css={S.button('100px')}>회원승인</Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('dues')} css={S.button('140px')}>회비납부</Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('dues-setup')} css={S.button('180px')}>회비생성</Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('edit-dues')} css={S.button('220px')}>회비수정</Button>
        <div css={S.logOutButton}>
          <Button variant="contained" color="secondary" sx={{ marginTop: '20vh', width: '100px' }} onClick={logOut}>로그아웃</Button>
        </div>
      </div>
    </div>
  );
}

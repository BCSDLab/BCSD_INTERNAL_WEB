import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import { pagePath } from 'layout/TopBar';
import * as S from './style';

export default function SideBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();
  const currentPage = pagePath.filter((path) => location.pathname === path.path)[0].path;

  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button
          color="secondary"
          sx={{ marginTop: '20px' }}
          size="large"
          onClick={() => navigate('member')}
          css={S.button(currentPage === '/member')}
        >
          회원 정보
        </Button>
        <Button
          color="secondary"
          sx={{ marginTop: '20px' }}
          size="large"
          onClick={() => navigate('mypage')}
          css={S.button(currentPage === '/mypage')}
        >
          마이페이지
        </Button>
        <Button
          color="secondary"
          sx={{ marginTop: '20px' }}
          size="large"
          onClick={() => navigate('accept')}
          css={S.button(currentPage === '/accept')}
        >
          회원 승인
        </Button>
        <Button
          color="secondary"
          sx={{ marginTop: '20px' }}
          size="large"
          onClick={() => setIsClicked((prev) => !prev)}
          css={S.duesButton}
        >
          회비
          {isClicked ? <KeyboardDoubleArrowUp /> : <KeyboardDoubleArrowDown />}
        </Button>
        <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('track')}>트랙정보</Button>
        {
          isClicked && (
            <div css={S.duesGroup}>
              <Button
                color="secondary"
                sx={{ marginTop: '20px' }}
                size="large"
                onClick={() => navigate('dues')}
                css={S.button(currentPage === '/dues')}
              >
                납부 내역
              </Button>
              <Button
                color="secondary"
                sx={{ marginTop: '20px' }}
                size="large"
                onClick={() => navigate('dues-setup')}
                css={S.button(currentPage === '/dues-setup')}
              >
                회비 생성
              </Button>
              <Button
                color="secondary"
                sx={{ marginTop: '20px' }}
                size="large"
                onClick={() => navigate('edit-dues')}
                css={S.button(currentPage === '/edit-dues')}
              >
                회비 수정
              </Button>
            </div>
          )
        }
        <div css={S.logOutButton}>
          <Button variant="contained" color="secondary" sx={{ width: '100px' }} onClick={logOut}>로그아웃</Button>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Button, Drawer } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from '@mui/icons-material';
import { pagePath } from 'layout/TopBar';
import { PATHS } from 'util/constants/path';
import { staticImage } from 'const/images';
import * as S from './style';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: Props) {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const location = useLocation();
  const currentPage = pagePath.filter((path) => location.pathname === path.path)[0].path;

  return (
    <Drawer open={open} onClose={onClose}>
      <div css={S.container}>
        <div css={S.sideBar}>
          <img src={staticImage.banner} alt="logo" css={S.logo} onClick={() => navigate(PATHS.home)} />
          <Button
            color="secondary"
            sx={{ marginTop: '20px' }}
            size="large"
            onClick={() => navigate('member')}
            css={S.button(currentPage === PATHS.member)}
          >
            회원 정보
          </Button>
          <Button
            color="secondary"
            sx={{ marginTop: '20px' }}
            size="large"
            onClick={() => navigate('mypage')}
            css={S.button(currentPage === PATHS.myPage)}
          >
            마이페이지
          </Button>
          <Button
            color="secondary"
            sx={{ marginTop: '20px' }}
            size="large"
            onClick={() => navigate('accept')}
            css={S.button(currentPage === PATHS.accept)}
          >
            회원 승인
          </Button>
          <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('track')} css={S.button(currentPage === PATHS.track)}>트랙 정보</Button>
          <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('role')} css={S.button(currentPage === PATHS.role)}>직책 정보</Button>
          <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('reservation')} css={S.button(currentPage === PATHS.reservation)}>예약 정보</Button>
          <Button color="secondary" sx={{ marginTop: '20px' }} size="large" onClick={() => navigate('team')} css={S.button(currentPage === PATHS.team)}>팀 정보</Button>
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
          {
            isClicked && (
              <div css={S.duesGroup}>
                <Button
                  color="secondary"
                  sx={{ marginTop: '20px' }}
                  size="large"
                  onClick={() => navigate('dues')}
                  css={S.button(currentPage === PATHS.dues)}
                >
                  납부 내역
                </Button>
                <Button
                  color="secondary"
                  sx={{ marginTop: '20px' }}
                  size="large"
                  onClick={() => navigate('dues-setup')}
                  css={S.button(currentPage === PATHS.duesSetup)}
                >
                  회비 생성
                </Button>
                <Button
                  color="secondary"
                  sx={{ marginTop: '20px' }}
                  size="large"
                  onClick={() => navigate('edit-dues')}
                  css={S.button(currentPage === PATHS.editDues)}
                >
                  회비 수정
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </Drawer>
  );
}

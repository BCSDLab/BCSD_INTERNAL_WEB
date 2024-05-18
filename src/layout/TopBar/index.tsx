import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginState } from 'store/loginStore';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useQueryParam from 'util/hooks/useQueryParam';
import { PATHS } from 'util/constants/path';
import { useEffect } from 'react';
import { useGetMe } from 'query/members';
import { useSlackSync } from 'query/admin';
import * as S from './style';

export const pagePath = [
  {
    path: PATHS.accept,
    title: '회원가입 승인',
  },
  {
    path: PATHS.member,
    title: '회원 정보',
  },
  {
    path: PATHS.myPage,
    title: '마이페이지',
  },
  {
    path: PATHS.dues,
    title: '회비 납부 내역',
  },
  {
    path: PATHS.duesSetup,
    title: '회비 생성',
  },
  {
    path: PATHS.editDues,
    title: '회비 내역 수정',
  },
  {
    path: PATHS.track,
    title: '트랙 정보',
  },
  {
    path: PATHS.team,
    title: '팀 정보',
  },
  {
    path: PATHS.role,
    title: '직책 정보',
  },
  {
    path: PATHS.reservation,
    title: '동방 예약',
  },
];

const currentYear = new Date().getFullYear();

interface Props {
  openSideBar: () => void;
  onClose: () => void;
}

export default function TopBar({ openSideBar, onClose }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const param = useQueryParam('page');
  const pages = Number(param);
  const duesYear = pages ? currentYear - pages + 1 : currentYear;
  const { deleteMe } = useLoginState();
  const { data: getMe } = useGetMe();
  const { mutate: slackSync } = useSlackSync();

  const memberAuthority = getMe.authority;

  const logOut = () => {
    deleteMe();
    navigate(PATHS.home);
  };

  const handleSlackSyncClick = () => {
    slackSync();
  };

  const { title, path } = pagePath.filter((page) => page.path === location.pathname)[0];

  useEffect(() => {
    onClose();
  }, [onClose, location.pathname]);

  return (
    <div css={S.top}>
      <div css={S.flex}>
        <Button onClick={openSideBar}>
          <MenuIcon />
        </Button>
        <h1>{path.includes('dues') ? `${duesYear}년 ${title}` : title}</h1>
      </div>
      <div css={S.buttonContainer}>
        {(memberAuthority === 'ADMIN' || memberAuthority === 'MANAGER') && (
        <Button variant="contained" color="primary" css={S.syncButton} onClick={handleSlackSyncClick}>슬랙 동기화</Button>
        )}
        <Button variant="contained" color="primary" sx={{ width: '100px' }} onClick={logOut}>로그아웃</Button>
      </div>
    </div>
  );
}

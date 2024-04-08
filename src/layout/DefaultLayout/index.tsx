import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import TopBar from 'layout/TopBar';
import SideBar from 'layout/SideBar';
import { useLoginState } from 'store/loginStore';
import { useSnackBar } from 'ts/useSnackBar';
import { PATHS } from 'util/constants/path';
import useBooleanState from 'util/hooks/useBooleanState';
import * as S from './style';

const beginnerPage = [PATHS.track, PATHS.role, PATHS.myPage];

export default function DefaultLayout() {
  const { me } = useLoginState();
  const { value: open, setFalse: onClose, setTrue: openSideBar } = useBooleanState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const openSnackBar = useSnackBar();
  const isBeginner = me?.memberType === 'BEGINNER';

  if (isBeginner && !beginnerPage.includes(location.pathname)) {
    openSnackBar({ type: 'error', message: '접근 권한이 없습니다.' });
    navigate('/track');
  }

  return (
    <div css={S.Layout}>
      <div css={S.width}>
        <TopBar openSideBar={openSideBar} onClose={onClose} />
        <div css={S.content}>
          <Outlet />
        </div>
      </div>
      <SideBar open={open} onClose={onClose} />
    </div>
  );
}

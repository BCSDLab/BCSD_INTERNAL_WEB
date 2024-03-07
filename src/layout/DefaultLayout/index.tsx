import { Outlet } from 'react-router-dom';
import TopBar from 'layout/TopBar';
import SideBar from 'layout/SideBar';
import * as S from './style';

export default function DefaultLayout() {
  return (
    <div css={S.Layout}>
      <SideBar />
      <div css={S.marginRight} />
      <div>
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
}

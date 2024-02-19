import SideBar from 'layout/SideBar';
import { Outlet } from 'react-router-dom';
import * as S from './style';

export default function DefaultLayout() {
  return (
    <div css={S.layout}>
      <SideBar />
      <Outlet />
    </div>
  );
}

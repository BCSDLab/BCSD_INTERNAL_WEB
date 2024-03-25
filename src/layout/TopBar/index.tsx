import { useLocation } from 'react-router-dom';
import useQueryParam from 'util/hooks/useQueryParam';
import { PATHS } from 'util/constants/path';
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
    path: PATHS.role,
    title: '직책 정보',
  },
  {
    path: PATHS.reservation,
    title: '동방 예약',
  },
];

const currentYear = new Date().getFullYear();

export default function TopBar() {
  const location = useLocation();
  const pages = useQueryParam('page', 'number') as number | null;
  const duesYear = pages ? currentYear - pages + 1 : currentYear;

  const { title, path } = pagePath.filter((page) => page.path === location.pathname)[0];

  return (
    <div css={S.top}>
      <h1>{path.includes('dues') ? `${duesYear}년 ${title}` : title}</h1>
    </div>
  );
}

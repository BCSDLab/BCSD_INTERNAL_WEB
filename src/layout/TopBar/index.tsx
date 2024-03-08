import { useLocation } from 'react-router-dom';
import useQueryParam from 'util/hooks/useQueryParam';
import * as S from './style';

const pagePath = [
  {
    path: '/accept',
    title: '회원가입 승인',
  },
  {
    path: '/member',
    title: '회원 정보',
  },
  {
    path: '/mypage',
    title: '마이페이지',
  },
  {
    path: '/dues',
    title: '회비 내역',
  },
  {
    path: '/dues-setup',
    title: '회비 생성',
  },
  {
    path: '/edit-dues',
    title: '회비 내역 수정',
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

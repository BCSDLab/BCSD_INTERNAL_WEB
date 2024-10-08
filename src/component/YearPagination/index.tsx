import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LAST_DUES_YEAR } from 'util/constants/status';
import { useQueryParam } from 'util/hooks/useQueryParam';
import * as S from './style';

interface YearPaginationProps {
  duesYear: number;
  setDuesYear: React.Dispatch<React.SetStateAction<number>>;
  routeParam: string;
}

export default function YearPagination({ duesYear, setDuesYear, routeParam }: YearPaginationProps) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const param = useQueryParam('page');
  const page = Number(param);

  const goToPrevYear = () => {
    // 재학생 회비 내역이 2021년부터 시작하므로 2021년 이전으로 이동할 수 없음
    const prevYear = page ? page + 1 : 2;
    if (prevYear <= currentYear - 2020) {
      navigate(`/${routeParam}?page=${prevYear}`);
      setDuesYear((prev) => prev - 1);
    }
  };

  const goToNextYear = () => {
    if (page && page > 1) {
      navigate(`/${routeParam}?page=${page - 1}`);
      setDuesYear((prev) => prev + 1);
    }
  };

  return (
    <>
      <Button onClick={goToPrevYear} disabled={duesYear === LAST_DUES_YEAR}>
        <ArrowBackIosNewOutlined />
      </Button>
      <span css={S.paginationTitle}>{duesYear}</span>
      <Button onClick={goToNextYear} disabled={duesYear === currentYear}>
        <ArrowForwardIosOutlined />
      </Button>
    </>
  );
}

import {
  Modal, Box, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import { useState } from 'react';
import { useGetCalender } from 'page/Reservation/hook/useGetCalender';
import { useSnackBar } from 'ts/useSnackBar';
// eslint-disable-next-line
import { style } from './MonthModal';
import DetailInfomation from './DetailInfomation';
import * as S from './style';

type Alignment = 'information' | 'passed' | 'reservation';

export const useToggleButtonGroup = () => {
  const [alignment, setAlignment] = useState<Alignment>('information');
  const snackBar = useSnackBar();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Alignment,
  ) => {
    if (newAlignment === 'reservation') {
      if (!gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token) {
        snackBar({ type: 'error', message: '구글 로그인이 필요한 서비스입니다' });
        // 스낵바 노출 후 로그인창 열기
        setTimeout(() => gapi.auth2.getAuthInstance().signIn(), 500);
        return;
      }
    }
    if (event.target instanceof HTMLElement) setAlignment(newAlignment);
  };

  return { alignment, handleChange };
};

interface Props {
  open: boolean;
  handleClose: () => void;
  currentMonth: number;
  currentYear: number;
}

export default function MyReservation({
  open, handleClose, currentMonth, currentYear,
}: Props) {
  const { data: eventList } = useGetCalender({ currentMonth, currentYear });
  const { alignment, handleChange } = useToggleButtonGroup();

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <ToggleButtonGroup
          color="primary"
          exclusive
          value={alignment}
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="information">예약 정보</ToggleButton>
          <ToggleButton value="passed">지난 예약</ToggleButton>
        </ToggleButtonGroup>
        <div css={S.DetailLayout}>
          {alignment === 'information'
            && eventList.filter((item) => (Number(item.endDateTime.slice(5, 7)) > new Date().getMonth() + 1) || (Number(item.endDateTime.slice(5, 7)) === new Date().getMonth() + 1 && Number(item.endDateTime.slice(8, 10)) >= new Date().getDate())).map(
              (filtered) => (
                <DetailInfomation
                  detailedReason={filtered.detailedReason}
                  startDateTime={filtered.startDateTime}
                  endDateTime={filtered.endDateTime}
                  memberCount={filtered.memberCount}
                  reason={filtered.reason}
                  eventId={filtered.eventId}
                  memberName={filtered.memberName}
                />
              ),
            )}
          {alignment === 'passed'
            && eventList.filter((item) => (Number(item.endDateTime.slice(5, 7)) < new Date().getMonth() + 1) || (Number(item.endDateTime.slice(5, 7)) === new Date().getMonth() + 1 && (Number(item.endDateTime.slice(8, 10)) < new Date().getDate()))).map(
              (filtered) => (
                <DetailInfomation
                  detailedReason={filtered.detailedReason}
                  startDateTime={filtered.startDateTime}
                  endDateTime={filtered.endDateTime}
                  memberCount={filtered.memberCount}
                  reason={filtered.reason}
                  eventId={filtered.eventId}
                  memberName={filtered.memberName}
                  passed={true}
                />
              ),
            )}
        </div>
      </Box>
    </Modal>
  );
}

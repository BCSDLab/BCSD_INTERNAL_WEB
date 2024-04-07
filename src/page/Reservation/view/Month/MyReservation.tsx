import {
  Modal, Box, ToggleButtonGroup, ToggleButton,
} from '@mui/material';
import { useGetMyReservations } from 'query/reservations';
import { useState } from 'react';
// eslint-disable-next-line
import { style } from './MonthModal';
import DetailInfomation from './DetailInfomation';

type Alignment = 'information' | 'passed';

export default function MyReservation({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const { data } = useGetMyReservations();
  const [alignment, setAlignment] = useState<Alignment>('information');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Alignment,
  ) => {
    if (event.target instanceof HTMLElement) setAlignment(newAlignment);
  };

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
        {alignment === 'information'
          && data.filter((item) => (Number(item.endDateTime.slice(5, 7)) >= new Date().getMonth() + 1) && (Number(item.endDateTime.slice(8, 10)) >= new Date().getDate())).map(
            (filtered) => (
              <DetailInfomation
                detailedReason={filtered.detailedReason}
                startDateTime={filtered.startDateTime}
                endDateTime={filtered.endDateTime}
                memberCount={filtered.memberCount}
                reason={filtered.reason}
                id={filtered.id}
                memberName={filtered.memberName}
              />
            ),
          )}
        {alignment === 'passed'
          && data.filter((item) => (Number(item.endDateTime.slice(5, 7)) < new Date().getMonth() + 1) && (Number(item.endDateTime.slice(8, 10)) < new Date().getDate())).map(
            (filtered) => (
              <DetailInfomation
                detailedReason={filtered.detailedReason}
                startDateTime={filtered.startDateTime}
                endDateTime={filtered.endDateTime}
                memberCount={filtered.memberCount}
                reason={filtered.reason}
                id={filtered.id}
                memberName={filtered.memberName}
              />
            ),
          )}
      </Box>
    </Modal>
  );
}

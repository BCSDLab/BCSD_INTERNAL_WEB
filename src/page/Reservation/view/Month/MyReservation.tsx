import { Modal, Box } from '@mui/material';
import { useGetMyReservations } from 'query/reservations';
// eslint-disable-next-line
import { style } from './MonthModal';
import DetailInfomation from './DetailInfomation';

export default function MyReservation({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const { data } = useGetMyReservations();

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        {data.map((item) => <DetailInfomation detailedReason={item.detailedReason} startDateTime={item.startDateTime} endDateTime={item.endDateTime} memberCount={item.memberCount} reason={item.reason} id={item.id} />)}
      </Box>
    </Modal>
  );
}

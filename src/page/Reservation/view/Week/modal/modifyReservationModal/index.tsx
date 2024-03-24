import { Button, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteReservations, useGetReservations, usePutReservations } from 'query/reservations';
import { Reservations } from 'model/reservations';
import { useSnackBar } from 'ts/useSnackBar';
import * as S from './style';

interface CreateReservationModalProps {
  open: boolean;
  onClose: () => void;
  startDateTime: string;
  endDateTime: string;
  reservationInfoIndex: number;
}

export default function ModifyReservationModal({
  open, onClose, startDateTime, endDateTime, reservationInfoIndex,
}: CreateReservationModalProps) {
  const openSnackBar = useSnackBar();
  const { data: reservationsInfo } = useGetReservations();
  const { mutate: putReservations } = usePutReservations();
  const { mutate: deleteReservations } = useDeleteReservations();
  const [reservationInfo, setReservationInfo] = useState<Reservations>({
    memberCount: 0,
    reason: '',
    detailedReason: '',
    startDateTime,
    endDateTime,
  });
  console.log(reservationsInfo[reservationInfoIndex]);

  useEffect(() => {
    if (reservationsInfo) {
      setReservationInfo(reservationsInfo[reservationInfoIndex]);
    }
  }, [reservationsInfo, reservationInfoIndex]);

  const handleReservationInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationInfo({
      ...reservationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePutReservationClick = () => {
    // 입력 에러 핸들링
    if (reservationInfo.memberCount === 0) {
      openSnackBar({ type: 'error', message: '사용 인원 수를 입력해주세요.' });
    } else if (reservationInfo.reason === '') {
      openSnackBar({ type: 'error', message: '사용 목적을 입력해주세요.' });
    } else if (reservationInfo.detailedReason === '') {
      openSnackBar({ type: 'error', message: '상세 사용 목적을 입력해주세요.' });
    } else {
      putReservations({ id: reservationInfoIndex, data: reservationInfo });
      onClose();
    }
  };

  const handleDeleteReservationClick = () => {
    deleteReservations(reservationInfoIndex);
    onClose();
  };

  const handleModalClose = () => {
    setReservationInfo({
      memberCount: 0,
      reason: '',
      detailedReason: '',
      startDateTime,
      endDateTime,
    });
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleModalClose}
    >
      <div css={S.reservationModal}>
        <h2 css={S.reservationModalTitle}>동방 예약 신청</h2>
        <div css={S.reservationTextFieldWrapper}>
          <TextField
            label="시작 시간"
            name="startDateTime"
            value={reservationInfo.startDateTime}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="종료 시간"
            name="endDateTime"
            value={reservationInfo.endDateTime}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="사용 인원 수"
            name="memberCount"
            value={reservationInfo.memberCount === 0 ? '' : reservationInfo.memberCount}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="사용 목적"
            name="reason"
            value={reservationInfo.reason}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="상세 사용 목적"
            name="detailedReason"
            value={reservationInfo.detailedReason}
            onChange={handleReservationInfoChange}
            css={S}
          />
        </div>
        <div css={S.buttonGroup}>
          <Button variant="contained" color="error" onClick={handleDeleteReservationClick}>예약 취소</Button>
          <Button variant="contained" onClick={handlePutReservationClick}>수정</Button>
          <Button variant="contained" onClick={handleModalClose}>취소</Button>
        </div>
      </div>
    </Modal>
  );
}

import { Button, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCreateReservations } from 'query/reservations';
import { GetReservationsResponse, Reservations } from 'model/reservations';
import { useSnackBar } from 'ts/useSnackBar';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import * as S from './style';

interface CreateReservationModalProps {
  open: boolean;
  onClose: () => void;
  startDateTime: string;
  endDateTime: string;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<GetReservationsResponse[], Error>>
}

export default function CreateReservationModal({
  open, onClose, startDateTime, endDateTime, refetch,
}: CreateReservationModalProps) {
  const [reservationInfo, setReservationInfo] = useState<Reservations>({
    memberCount: 0,
    reason: '',
    detailedReason: '',
    startDateTime,
    endDateTime,
  });
  const openSnackBar = useSnackBar();
  const { mutate: postReservations, isSuccess: isPostReservationsSuccess } = useCreateReservations();

  useEffect(() => {
    if (isPostReservationsSuccess) {
      refetch();
    }
  }, [isPostReservationsSuccess, refetch]);

  const handleReservationInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationInfo({
      ...reservationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateDateTimeFormat = (dateTimeString: string) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

    if (!regex.test(dateTimeString)) {
      return false;
    }
    return true;
  };

  const handleCreateReservationClick = () => {
    // 입력 에러 핸들링
    if (reservationInfo.memberCount === 0) {
      openSnackBar({ type: 'error', message: '사용 인원 수를 입력해주세요.' });
    } else if (reservationInfo.reason === '') {
      openSnackBar({ type: 'error', message: '사용 목적을 입력해주세요.' });
    } else if (reservationInfo.detailedReason === '') {
      openSnackBar({ type: 'error', message: '상세 사용 목적을 입력해주세요.' });
    } else if (!validateDateTimeFormat(reservationInfo.startDateTime) && !validateDateTimeFormat(reservationInfo.endDateTime)) {
      openSnackBar({ type: 'error', message: '날짜 형식이 올바르지 않습니다.' });
    } else {
      postReservations(reservationInfo);
      onClose();
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          <Button variant="contained" onClick={handleCreateReservationClick}>신청</Button>
          <Button variant="contained" onClick={onClose}>취소</Button>
        </div>
      </div>
    </Modal>
  );
}

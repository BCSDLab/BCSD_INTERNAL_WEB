import { Button, Modal, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteReservations, useGetReservations, usePutReservations } from 'query/reservations';
import { GetReservationsResponse, Reservation } from 'model/reservations';
import { useSnackBar } from 'ts/useSnackBar';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import * as S from './style';

interface CreateReservationModalProps {
  open: boolean;
  reservationInfoIndex: number;
  onClose: () => void;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<GetReservationsResponse[], Error>>
}

const initialReservationInfo = {
  memberName: '',
  memberCount: 0,
  reason: '',
  detailedReason: '',
  startDateTime: '',
  endDateTime: '',
};

export default function ModifyReservationModal({
  open, reservationInfoIndex, onClose, refetch,
}: CreateReservationModalProps) {
  const openSnackBar = useSnackBar();
  const { data: reservationsInfo } = useGetReservations();
  const { mutate: putReservations, isSuccess: isPutReservationsSuccess } = usePutReservations();
  const { mutate: deleteReservations, isSuccess: isDeleteReservationsSuccess } = useDeleteReservations();
  const [reservationInfo, setReservationInfo] = useState<Reservation>(initialReservationInfo);

  useEffect(() => {
    if (reservationsInfo) {
      setReservationInfo(reservationsInfo[reservationInfoIndex]);
    }
  }, [reservationsInfo, reservationInfoIndex]);

  useEffect(() => {
    if (isPutReservationsSuccess || isDeleteReservationsSuccess) {
      refetch();
    }
  }, [isPutReservationsSuccess, isDeleteReservationsSuccess, refetch]);

  const handleReservationInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationInfo({
      ...reservationInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateDateTimeFormat = (dateTimeString: string) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/;

    if (!regex.test(dateTimeString)) {
      return false;
    }
    return true;
  };

  const handlePutReservationClick = () => {
    // 입력 에러 핸들링
    if (reservationInfo.memberCount === 0) {
      openSnackBar({ type: 'error', message: '사용 인원 수를 입력해주세요.' });
    } else if (reservationInfo.reason === '') {
      openSnackBar({ type: 'error', message: '사용 목적을 입력해주세요.' });
    } else if (reservationInfo.detailedReason === '') {
      openSnackBar({ type: 'error', message: '상세 사용 목적을 입력해주세요.' });
    } else if (!validateDateTimeFormat(reservationInfo.startDateTime) && !validateDateTimeFormat(reservationInfo.endDateTime)) {
      openSnackBar({ type: 'error', message: '날짜 형식을 확인해주세요.' });
    } else {
      putReservations({ id: reservationsInfo[reservationInfoIndex].id, data: reservationInfo });
      onClose();
    }
  };

  const handleDeleteReservationClick = () => {
    deleteReservations(reservationsInfo[reservationInfoIndex].id);
    onClose();
  };

  const handleModalClose = () => {
    setReservationInfo(initialReservationInfo);
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
            label="예약 등록자"
            name="memberName"
            value={reservationInfo?.memberName}
            disabled
            css={S}
          />
          <TextField
            label="시작 시간"
            name="startDateTime"
            value={reservationInfo?.startDateTime}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="종료 시간"
            name="endDateTime"
            value={reservationInfo?.endDateTime}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="사용 인원 수"
            name="memberCount"
            value={reservationInfo?.memberCount === 0 ? '' : reservationInfo?.memberCount}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="사용 목적"
            name="reason"
            value={reservationInfo?.reason}
            onChange={handleReservationInfoChange}
            css={S}
          />
          <TextField
            label="상세 사용 목적"
            name="detailedReason"
            value={reservationInfo?.detailedReason}
            onChange={handleReservationInfoChange}
            css={S}
          />
        </div>
        <div css={S.buttonGroup}>
          {new Date(reservationInfo?.startDateTime) >= new Date() && (
            <>
              <Button variant="contained" color="error" onClick={handleDeleteReservationClick}>예약 취소</Button>
              <Button variant="contained" onClick={handlePutReservationClick}>수정</Button>
            </>
          )}
          <Button variant="contained" onClick={handleModalClose}>취소</Button>
        </div>
      </div>
    </Modal>
  );
}

import {
  Box, Modal, TextField, Button, MenuItem,
} from '@mui/material';
import { useCreateReservations } from 'query/reservations';
import { useState } from 'react';
import { HOUR_LIST, MINUTE_LIST } from 'util/constants/time';
import DetailInfomation from './DetailInfomation';
// eslint-disable-next-line import/no-cycle
import { CalendarContent } from '../Month';

import * as S from './style';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type ModalContent = {
  open: boolean,
  handleClose: () => void
} & CalendarContent;

const initialState = {
  memberCount: 0,
  reason: '',
  detailedReason: '',
  startHour: '00',
  startMinute: '00',
  endHour: '00',
  endMinute: '00',
};

export default function MonthModal({
  date, today, data, open, handleClose,
}: ModalContent) {
  const currentDate = new Date().getDate();
  const { mutate: reservation } = useCreateReservations();
  const [reserve, setReserve] = useState(initialState);

  const changeMemberCount = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setReserve({ ...reserve, memberCount: parseInt(e.target.value, 10) });
  const changeReason = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setReserve({ ...reserve, reason: e.target.value });
  const changeDetailedReason = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setReserve({ ...reserve, detailedReason: e.target.value });

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <h2>
          {today}
          {' '}
          예약정보
        </h2>

        {data.length > 0 ? (
          <div css={S.DetailLayout}>
            {data.map((item) => (
              <DetailInfomation
                detailedReason={item.detailedReason}
                startDateTime={item.startDateTime}
                endDateTime={item.endDateTime}
                reason={item.reason}
                memberCount={item.memberCount}
              />
            ))}
          </div>
        ) : <div css={S.DetailLayout}>예약정보가 없습니다.</div>}

        {date && date >= currentDate
          && (
            <div css={S.ReserveContainer}>
              <h2>예약하기</h2>
              <div css={S.ReservationLayout}>
                <div css={S.SpaceBetween}>
                  <TextField
                    id="outlined-basic"
                    label="인원 수"
                    variant="outlined"
                    size="small"
                    type="number"
                    sx={{ width: 100 }}
                    value={reserve.memberCount}
                    onChange={changeMemberCount}
                  />
                  <TextField
                    id="outlined-basic"
                    label="사용목적"
                    variant="outlined"
                    size="small"
                    value={reserve.reason}
                    onChange={changeReason}
                  />
                </div>
                <TextField
                  id="outlined-basic"
                  label="상세설명"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  value={reserve.detailedReason}
                  onChange={changeDetailedReason}
                />
                <div css={S.TimeLayout}>
                  <div css={S.AlignItems}>
                    <span>시작시간</span>
                    <TextField
                      select
                      label="시간"
                      sx={{ width: 70 }}
                      onChange={(e) => setReserve({ ...reserve, startHour: e.target.value })}
                      defaultValue="00"
                    >
                      {HOUR_LIST.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="분"
                      size="medium"
                      sx={{ width: 70 }}
                      onChange={(e) => setReserve({ ...reserve, startMinute: e.target.value })}
                      defaultValue="00"
                    >
                      {MINUTE_LIST.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <div css={S.AlignItems}>
                    <span>종료시간</span>
                    <TextField
                      select
                      label="시간"
                      sx={{ width: 70 }}
                      onChange={(e) => setReserve({ ...reserve, endHour: e.target.value })}
                      defaultValue="00"
                    >
                      {HOUR_LIST.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      select
                      label="분"
                      sx={{ width: 70 }}
                      onChange={(e) => setReserve({ ...reserve, endMinute: e.target.value })}
                      defaultValue="00"
                    >
                      {MINUTE_LIST.map((hour) => (
                        <MenuItem key={hour} value={hour}>
                          {hour}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>
                <Button onClick={() => today && reservation({
                  memberCount: reserve.memberCount,
                  reason: reserve.reason,
                  detailedReason: reserve.detailedReason,
                  startDateTime: `${today.slice(0, 4)}-${today.slice(5, 7)}-${today.slice(8, 10)} ${reserve.startHour}:${reserve.startMinute}`,
                  endDateTime: `${today.slice(0, 4)}-${today.slice(5, 7)}-${today.slice(8, 10)} ${reserve.endHour}:${reserve.endMinute}`,
                })}
                >
                  예약
                </Button>
              </div>
            </div>
          )}
      </Box>
    </Modal>
  );
}

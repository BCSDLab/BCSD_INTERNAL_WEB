import {
  Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import useBooleanState from 'util/hooks/useBooleanState';
import { useEffect, useState } from 'react';
import { useSnackBar } from 'ts/useSnackBar';
import { useGetJobs, usePutJobs } from 'query/jobs';
import * as S from './style';

interface InitialJob {
  type: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
}

export default function UpdateJobModal({ memberId }: { memberId: number }) {
  const initialJob: InitialJob = {
    type: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
  };
  const { value: open, setTrue: onOpen, setFalse: onClose } = useBooleanState(false);
  const [info, setInfo] = useState<InitialJob | null>(initialJob);
  const [type, setType] = useState<string>('');
  const currentYear = new Date().getFullYear();
  const openSnackBar = useSnackBar();
  const { data, refetch } = useGetJobs(currentYear);
  const putJobsMutation = usePutJobs();

  const jobTypes = data?.jobs.filter((job) => job.memberId === memberId).map((job) => job.type);

  const handleMenuItemChange = (e: SelectChangeEvent) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (data && jobTypes && selectedType && jobTypes.includes(selectedType)) {
      const index = jobTypes.indexOf(selectedType);
      setInfo({
        type: selectedType,
        startYear: data.jobs[index].startYear.toString(),
        startMonth: data.jobs[index].startMonth.toString(),
        endYear: data.jobs[index].endYear.toString(),
        endMonth: data.jobs[index].endMonth.toString(),
      });
    }
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (info) {
      setInfo({ ...info, [name]: value });
    }
  };

  const handleSaveInfoClick = () => {
    // 클라이언트 차원에서 에러 핸들링
    if (info && data) {
      const jobIds = data.jobs.filter((job) => job.memberId === memberId).map((job) => job.id);
      const index = jobTypes.indexOf(type);
      if (info.startYear === '' || info.startMonth === '' || info.endYear === '' || info.endMonth === '') {
        openSnackBar({ type: 'error', message: '빈 칸을 채워주세요.' });
      } else if (Number.isNaN(Number(info.startYear)) || Number.isNaN(Number(info.startMonth)) || Number.isNaN(Number(info.endYear)) || Number.isNaN(Number(info.endMonth))) {
        openSnackBar({ type: 'error', message: '숫자만 입력 가능합니다.' });
      } else if (Number(info.startYear) > Number(info.endYear)) {
        openSnackBar({ type: 'error', message: '시작 연도가 종료 연도보다 늦을 수 없습니다.' });
      } else if (Number(info.startYear) === Number(info.endYear) && Number(info.startMonth) > Number(info.endMonth)) {
        openSnackBar({ type: 'error', message: '시작 월이 종료 월보다 늦을 수 없습니다.' });
      } else if (info.type === data.jobs[index].type && Number(info.startYear) === data.jobs[index].startYear && Number(info.startMonth) === data.jobs[index].startMonth && Number(info.endYear) === data.jobs[index].endYear && Number(info.endMonth) === data.jobs[index].endMonth) {
        openSnackBar({ type: 'error', message: '수정된 내용이 없습니다.' });
      } else {
        putJobsMutation.mutate({
          id: jobIds[index],
          memberId,
          type: info.type,
          startYear: Number(info.startYear),
          startMonth: Number(info.startMonth),
          endYear: Number(info.endYear),
          endMonth: Number(info.endMonth),
        });
      }
    }
  };

  useEffect(() => {
    if (putJobsMutation.isSuccess) {
      refetch();
      onClose();
    }
  }, [putJobsMutation.isSuccess, onClose, refetch]);
  return (
    <>
      <Button css={S.updateButton} variant="contained" color="primary" onClick={onOpen}>직책 수정</Button>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div css={S.modal}>
          <h2 css={S.modalTitle}>{`${currentYear} 직책 정보 수정`}</h2>
          <div css={S.modalContent}>
            <FormControl css={S.jobSelection}>
              <InputLabel id="job-type-select-label">직책 선택</InputLabel>
              <Select
                value={type}
                label="직책 선택"
                onChange={handleMenuItemChange}
              >
                {data && jobTypes && jobTypes.map((jobType) => (
                  <MenuItem value={jobType} key={jobType}>{jobType}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="직책명"
              name="type"
              value={info?.type}
              onChange={handleInfoChange}
              css={S.textField}
            />
            <TextField
              label="직책 시작 연도"
              name="startYear"
              value={info?.startYear}
              onChange={handleInfoChange}
              css={S.textField}

            />
            <TextField
              label="직책 시작 월"
              name="startMonth"
              value={info?.startMonth}
              onChange={handleInfoChange}
              css={S.textField}

            />
            <TextField
              label="직책 종료 연도"
              name="endYear"
              value={info?.endYear}
              onChange={handleInfoChange}
              css={S.textField}
            />
            <TextField
              label="직책 종료 월"
              name="endMonth"
              value={info?.endMonth}
              onChange={handleInfoChange}
              css={S.textField}
            />
          </div>
          <div css={S.buttonWrapper}>
            <Button variant="contained" onClick={handleSaveInfoClick}>저장</Button>
            <Button variant="outlined" onClick={onClose} css={S.closeButton}>닫기</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

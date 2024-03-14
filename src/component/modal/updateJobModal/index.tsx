import {
  Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useSnackBar } from 'ts/useSnackBar';
import { useDeleteJobs, useGetJobs, usePutJobs } from 'query/jobs';
import * as S from './style';

interface InitialJob {
  type: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
}

interface UpdateJobModalProps {
  memberId: number;
  jobId: number;
  open: boolean;
  onClose: () => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  selectedYear: number;
}

export default function UpdateJobModal({
  memberId, jobId, open, onClose, setIsSuccess, selectedYear,
}: UpdateJobModalProps) {
  const initialJob: InitialJob = useMemo(() => ({
    type: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
  }), []);
  const [info, setInfo] = useState<InitialJob | null>(initialJob);
  const [type, setType] = useState<string>('');
  const openSnackBar = useSnackBar();
  const { data } = useGetJobs(selectedYear);
  const putJobsMutation = usePutJobs({ setIsSuccess, onClose });
  const deleteJobsMutation = useDeleteJobs({ setIsSuccess, onClose });

  const jobTypes = data?.jobs.filter((job) => job.memberId === memberId).map((job) => job.type);
  const selectedJob = data?.jobs.find((job) => job.id === jobId);

  useEffect(() => {
    if (open && selectedJob) {
      setInfo({
        type: selectedJob.type,
        startYear: selectedJob.startYear.toString(),
        startMonth: selectedJob.startMonth.toString(),
        endYear: selectedJob.endYear.toString(),
        endMonth: selectedJob.endMonth.toString(),
      });
      setType(selectedJob.type);
    }
  }, [open, initialJob, selectedJob]);

  const handleMenuItemChange = (e: SelectChangeEvent) => {
    const selectedType = e.target.value;
    setType(selectedType);
    if (data && jobTypes && selectedType && jobTypes.includes(selectedType)) {
      const index = data.jobs.findIndex((job) => job.memberId === memberId && job.type === selectedType);
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

  const handleDeleteJobClick = () => {
    if (info && data) {
      const jobIds = data.jobs.filter((job) => job.memberId === memberId).map((job) => job.id);
      const index = jobTypes.indexOf(type);
      deleteJobsMutation.mutate(jobIds[index]);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div css={S.modal}>
        <h2 css={S.modalTitle}>직책 정보 수정</h2>
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
        <div css={S.buttonContainer}>
          <div css={S.deleteButtonWrapper}>
            <Button variant="contained" color="error" onClick={handleDeleteJobClick}>직책 삭제</Button>
          </div>
          <div css={S.buttonWrapper}>
            <Button variant="contained" onClick={handleSaveInfoClick}>저장</Button>
            <Button variant="outlined" onClick={onClose} css={S.closeButton}>닫기</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

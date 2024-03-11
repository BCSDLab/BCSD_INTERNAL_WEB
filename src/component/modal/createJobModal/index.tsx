import { Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { usePostJobs } from 'query/jobs';
import { useGetMembers } from 'query/members';
import * as S from './style';

interface CreateJobModalProps {
  open: boolean;
  onClose: () => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateJobModal({ open, onClose, setIsSuccess }: CreateJobModalProps) {
  const initialInfo = {
    name: '',
    type: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
  };
  const [info, setInfo] = useState(initialInfo);
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const postJobsMutation = usePostJobs({ setIsSuccess, onClose });

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateInfoClick = () => {
    const memberId = members?.content.find((member) => member.name === info.name)?.id;
    if (memberId) {
      postJobsMutation.mutate({
        memberId,
        type: info.type,
        startYear: Number(info.startYear),
        startMonth: Number(info.startMonth),
        endYear: Number(info.endYear),
        endMonth: Number(info.endMonth),
      });
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <div css={S.modal}>
        <h2 css={S.modalTitle}>직책 생성</h2>
        <div css={S.modalContent}>
          <TextField
            label="이름"
            name="name"
            value={info?.name}
            onChange={handleInfoChange}
            css={S.textField}
          />
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
          <Button variant="contained" onClick={handleCreateInfoClick}>저장</Button>
          <Button variant="outlined" onClick={onClose} css={S.closeButton}>닫기</Button>
        </div>
      </div>
    </Modal>
  );
}

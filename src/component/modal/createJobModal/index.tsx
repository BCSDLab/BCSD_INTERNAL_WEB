import { Button, Modal, TextField } from '@mui/material';
import { useState } from 'react';
import { usePostJobs } from 'query/jobs';
import { useGetMembers } from 'query/members';
import { useSnackBar } from 'ts/useSnackBar';
import { Member } from 'model/member';
import * as S from './style';
import SearchNameModal from '../searchNameModal';

interface CreateJobModalProps {
  open: boolean;
  onClose: () => void;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InitialInfo {
  name: string;
  type: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
  email: string;
}

export default function CreateJobModal({ open, onClose, setIsSuccess }: CreateJobModalProps) {
  const initialInfo: InitialInfo = {
    name: '',
    type: '',
    startYear: '',
    startMonth: '',
    endYear: '',
    endMonth: '',
    email: '',
  };
  const [info, setInfo] = useState<InitialInfo>(initialInfo);
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: null });
  const postJobsMutation = usePostJobs({ setIsSuccess, onClose });
  const openSnackBar = useSnackBar();
  const [nameModalOpen, setNameModalOpen] = useState(false);

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateInfoClick = () => {
    const memberId = members?.content.find((member) => member.name === info.name)?.id;
    const email = members?.content.find((member) => member.email === info.email)?.email;
    if (memberId) {
      if (info.startYear === '' || info.startMonth === '' || info.endYear === '' || info.endMonth === '') {
        openSnackBar({ type: 'error', message: '빈 칸을 채워주세요.' });
      } else if (Number.isNaN(Number(info.startYear)) || Number.isNaN(Number(info.startMonth)) || Number.isNaN(Number(info.endYear)) || Number.isNaN(Number(info.endMonth))) {
        openSnackBar({ type: 'error', message: '숫자만 입력 가능합니다.' });
      } else if (Number(info.startYear) > Number(info.endYear)) {
        openSnackBar({ type: 'error', message: '시작 연도가 종료 연도보다 늦을 수 없습니다.' });
      } else if (Number(info.startYear) === Number(info.endYear) && Number(info.startMonth) > Number(info.endMonth)) {
        openSnackBar({ type: 'error', message: '시작 월이 종료 월보다 늦을 수 없습니다.' });
      } else {
        postJobsMutation.mutate({
          email,
          type: info.type,
          startYear: Number(info.startYear),
          startMonth: Number(info.startMonth),
          endYear: Number(info.endYear),
          endMonth: Number(info.endMonth),
        });
      }
    }
  };

  const handleCloseModal = () => {
    onClose();
    setInfo(initialInfo);
  };

  const handleSelectMember = (member: Member) => {
    setInfo({
      ...info,
      name: member.name,
      email: member.email,
    });
    setNameModalOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
    >
      <>
        <div css={S.modal}>
          <h2 css={S.modalTitle}>직책 생성</h2>
          <div css={S.modalContent}>
            <TextField
              label="이름"
              name="name"
              value={info?.name}
              onClick={() => setNameModalOpen(true)}
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
            <Button variant="outlined" onClick={handleCloseModal} css={S.closeButton}>닫기</Button>
          </div>
        </div>
        {nameModalOpen && (
          <SearchNameModal
            open={nameModalOpen}
            onClose={() => setNameModalOpen(false)}
            onSelect={handleSelectMember}
          />
        )}
      </>
    </Modal>
  );
}

import {
  Button, Modal, TextareaAutosize,
} from '@mui/material';
import { useState } from 'react';
import * as S from './style';

interface AlertModalProps {
  open: boolean;
  onClose: () => void;
  handleSend: (explanation: string) => void;
  handleSendByDM: () => void;
  type: 'notice' | 'dm' | undefined;
}

export default function AlertModal({
  open, onClose, handleSend, handleSendByDM, type,
}: AlertModalProps) {
  const [explanation, setExplanation] = useState('');
  const handleSubmitNotice = () => {
    if (type === 'notice') {
      handleSend(explanation);
      return;
    }
    handleSendByDM();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div css={S.modal}>
        <h2>주의해주세요! 슬랙으로 메시지가 전송됩니다.</h2>
        {type === 'notice' && (
          <TextareaAutosize css={S.noticeInput} placeholder="추가 공지를 작성해주세요" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
        )}
        <div>
          <Button onClick={handleSubmitNotice}>전송</Button>
        </div>
      </div>
    </Modal>
  );
}

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
  handleSheetSync: () => void;
  type: 'notice' | 'dm' | 'sheet-sync' | undefined;
}

export default function AlertModal({
  open, onClose, handleSend, handleSendByDM, handleSheetSync, type,
}: AlertModalProps) {
  const [explanation, setExplanation] = useState('');

  const handleSubmitNotice = () => {
    switch (type) {
      case 'notice':
        handleSend(explanation);
        onClose();
        break;
      case 'dm':
        handleSendByDM();
        onClose();
        break;
      case 'sheet-sync':
        handleSheetSync();
        onClose();
        break;
      default:
        break;
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div css={S.modal}>
        {type === 'sheet-sync' ? (
          <h2>회비 납부 문서와 인터널 회비 내역이 동기화됩니다.</h2>
        ) : (
          <h2>주의해주세요! 슬랙으로 메시지가 전송됩니다.</h2>
        )}
        {type === 'notice' && (
          <TextareaAutosize css={S.noticeInput} placeholder="추가 공지를 작성해주세요" value={explanation} onChange={(e) => setExplanation(e.target.value)} />
        )}
        <div>
          <Button onClick={handleSubmitNotice}>{type === 'sheet-sync' ? '동기화' : '전송'}</Button>
        </div>
      </div>
    </Modal>
  );
}

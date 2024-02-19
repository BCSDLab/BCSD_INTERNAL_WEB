import {
  Modal, Box, Typography, Button, TextField, MenuItem,
} from '@mui/material';
import {
  Member, toAdminMemberUpdate, STATUS_LABEL,
} from 'model/member';
import { useEffect, useState } from 'react';
import { useUpdateMember, useDeleteMember } from 'query/members';
import { useGetTracks } from 'query/tracks';
import * as S from './style';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface MemberInfoModalProps {
  open: boolean;
  onClose: () => void;
  member: Member | null;
}

const MEMBER_TYPE_LABEL = {
  BEGINNER: '비기너',
  REGULAR: '레귤러',
  MENTOR: '멘토',
} as const;

const MEMBER_TYPE_LIST = ['BEGINNER', 'REGULAR', 'MENTOR'] as const;

const STATUS_LIST = ['ATTEND', 'OFF', 'IPP', 'ARMY', 'COMPLETION', 'GRADUATE'] as const;

export default function MemberInfoModal({ open, onClose, member: initialMember }: MemberInfoModalProps): React.ReactElement {
  const [member, setMember] = useState<Member | null>(initialMember);
  const { mutate: updateMember } = useUpdateMember();
  const { mutate: deleteMember } = useDeleteMember();
  const { data: tracks } = useGetTracks();

  useEffect(
    () => {
      setMember(initialMember);
    },
    [initialMember],
  );

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    }
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (member) setMember({ ...member, [name]: value });
  };

  const handleTrackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (member) {
      setMember({
        ...member,
        track: {
          id: Number(value),
          name: '',
        },
      });
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (member) setMember({ ...member, [name]: formatPhoneNumber(value) });
  };

  const handleSave = () => {
    if (member && member.id) {
      updateMember({
        id: member.id,
        updatedMember: toAdminMemberUpdate(member),
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (member && member.id) {
      deleteMember(member.id, {
        onSuccess: () => {
          onClose();
        },
        onError: () => {
          // TODO: 에러 처리
        },
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          회원 정보 수정
        </Typography>
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="이름"
              name="name"
              value={member?.name || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="트랙"
              name="track"
              value={member?.track?.id || ''}
              fullWidth
              onChange={handleTrackChange}
              select
            >
              {tracks.map((track) => (
                <MenuItem key={track.id} value={track.id}>
                  {track.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="직책"
              name="memberType"
              value={member?.memberType || ''}
              fullWidth
              onChange={handleChange}
              select
            >
              {MEMBER_TYPE_LIST.map((memberType) => (
                <MenuItem key={memberType} value={memberType}>
                  {MEMBER_TYPE_LABEL[memberType]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              margin="normal"
              label="상태"
              name="status"
              value={member?.status || ''}
              fullWidth
              onChange={handleChange}
              select
            >
              {STATUS_LIST.map((statusType) => (
                <MenuItem key={statusType} value={STATUS_LABEL[statusType]}>
                  {STATUS_LABEL[statusType]}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="소속"
              name="company"
              value={member?.company || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="학부"
              name="department"
              value={member?.department || ''}
              fullWidth
              onChange={handleChange}
            />
          </div>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="학번"
              name="studentNumber"
              value={member?.studentNumber || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="전화번호"
              name="phoneNumber"
              value={member?.phoneNumber || ''}
              fullWidth
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="이메일"
              name="email"
              value={member?.email || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="권한"
              name="authority"
              value={member?.authority || ''}
              fullWidth
              onChange={handleChange}
              disabled
            />
          </div>
          <div css={S.textGap}>
            <TextField
              margin="normal"
              label="깃허브 이름"
              name="githubName"
              value={member?.githubName || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="프로필 이미지"
              name="profileImageUrl"
              value="추후 파일 업로드 구현"
              fullWidth

            />
          </div>
          <div css={S.buttonContainer}>
            <Button sx={{ mt: 2, mb: 2 }} variant="contained" color="error" onClick={handleDelete}>
              회원 삭제
            </Button>
            <div css={S.buttonWrapper}>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="contained"
                onClick={handleSave}
              >
                저장
              </Button>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="outlined"
                onClick={onClose}
              >
                닫기
              </Button>
            </div>

          </div>
        </Box>
      </Box>
    </Modal>
  );
}

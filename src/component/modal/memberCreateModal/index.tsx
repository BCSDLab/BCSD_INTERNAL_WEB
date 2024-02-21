import {
  Modal, Box, Typography, Button, TextField, MenuItem, styled,
} from '@mui/material';
import {
  MemberCreate, toMemberCreate,
} from 'model/member';
import { useState } from 'react';
import { useCreateMember } from 'query/members';
import { useGetTracks } from 'query/tracks';
import { FileResponse, getPresignedUrl } from 'api/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
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
}

const MEMBER_TYPE_LABEL = {
  BEGINNER: '비기너',
  REGULAR: '레귤러',
  MENTOR: '멘토',
} as const;

const memberTypeList = ['BEGINNER', 'REGULAR', 'MENTOR'] as const;

const STATUS_LABEL = {
  ATTEND: '재학',
  OFF: '휴학',
  IPP: '현장실습',
  ARMY: '군 휴학',
  COMPLETION: '수료',
  GRADUATE: '졸업',
} as const;

const statusList = ['ATTEND', 'OFF', 'IPP', 'ARMY', 'COMPLETION', 'GRADUATE'] as const;

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface FileInfo {
  file: File;
  presignedUrl: FileResponse;
}

export default function MemberCreateModal({ open, onClose }: MemberInfoModalProps): React.ReactElement {
  const [member, setMember] = useState<MemberCreate | null>();
  const { mutate: createMember } = useCreateMember();
  const { data: tracks } = useGetTracks();
  const [imageInfo, setImageInfo] = useState<FileInfo>();

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
    const { name, value } = event.target; setMember({ ...member, [name]: value });
  };

  const handleTrackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMember({ ...member, trackId: Number(value) });
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMember({ ...member, [name]: formatPhoneNumber(value) });
  };

  const uploadImage = async ({ presignedUrl, file }: { presignedUrl: string, file: File }) => {
    await axios.put(presignedUrl, file, {
      headers: {
        'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
      },
    }); // 헤더에 authrization을 담으면 안된다
  };

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const presigned = await getPresignedUrl({
        fileName: file?.name as string,
      });

      setImageInfo({ file, presignedUrl: presigned });
    }
  };

  const handleSave = () => {
    if (member) {
      if (imageInfo?.presignedUrl) {
        uploadImage({ presignedUrl: imageInfo.presignedUrl.presignedUrl, file: imageInfo.file });
        createMember(toMemberCreate(member));
      } else {
        createMember(toMemberCreate(member));
      }
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
    setMember(null);
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
          회원 생성
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
              value={member?.trackId || ''}
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
              {memberTypeList.map((memberType) => (
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
              {statusList.map((statusType) => (
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
              label="가입 연도"
              name="joinedYear"
              value={member?.joinedYear || ''}
              fullWidth
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              label="가입 월"
              name="joinedMonth"
              value={member?.joinedMonth || ''}
              fullWidth
              onChange={handleChange}
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
              label="비밀번호"
              name="password"
              value={member?.password || ''}
              fullWidth
              onChange={handleChange}
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
            <Button
              component="label"
              fullWidth
              variant="outlined"
              sx={{ height: '60px', marginTop: '15px', padding: '0px' }}
              startIcon={<CloudUploadIcon />}
            >
              프로필 이미지
              <VisuallyHiddenInput type="file" accept="image/jpeg, image/png" onChange={(e) => handleImage(e)} />
            </Button>
          </div>
          <div css={S.buttonContainer}>
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
                onClick={handleClose}
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

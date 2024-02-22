import {
  Box, Button, MenuItem, TextField, Typography, styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Member, STATUS_LABEL } from 'model/member';
import { useGetTracks } from 'query/tracks';
import { useGetMe, useUpdateMe } from 'query/members';
import { FileResponse, getPresignedUrl } from 'api/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import * as S from './style';

const MEMBER_TYPE_LABEL = {
  BEGINNER: '비기너',
  REGULAR: '레귤러',
  MENTOR: '멘토',
} as const;

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

const MEMBER_TYPE_LIST = ['BEGINNER', 'REGULAR', 'MENTOR'] as const;

const STATUS_LIST = ['ATTEND', 'OFF', 'IPP', 'ARMY', 'COMPLETION', 'GRADUATE'] as const;

export default function MyPage() {
  const [member, setMember] = useState<Member | null>(null);
  const [imageInfo, setImageInfo] = useState<FileInfo>();
  const { data: tracks } = useGetTracks();
  const { mutate: updateMe } = useUpdateMe();
  const { data: getMe } = useGetMe();
  const DEFAULT_URL = 'https://image.bcsdlab.com/';

  interface FileInfo {
    file: File;
    presignedUrl: FileResponse;
  }

  useEffect(
    () => {
      if (getMe) {
        setMember(getMe);
      }
    },
    [getMe],
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

  const handleImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const presigned = await getPresignedUrl({
        fileName: file.name,
      });

      setImageInfo({ file, presignedUrl: presigned });
    }
  };

  const uploadImage = async ({ presignedUrl, file }: FileInfo) => {
    await axios.put(presignedUrl.presignedUrl, file, {
      headers: {
        'Content-Type': 'image/jpeg, image/png, image/svg+xml, image/webp',
      },
    }); // 헤더에 authrization을 담으면 안된다
  };

  const handleSave = () => {
    if (member) {
      if (imageInfo?.presignedUrl) {
        uploadImage({ presignedUrl: imageInfo.presignedUrl, file: imageInfo.file });
        updateMe({
          ...member,
          trackId: member.track?.id,
          profileImageUrl: DEFAULT_URL + imageInfo.presignedUrl.fileName,
        });
      } else {
        updateMe({
          ...member,
          trackId: member.track?.id,
        });
      }
    }
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (member) setMember({ ...member, [name]: formatPhoneNumber(value) });
  };
  return (
    <div css={S.container}>
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>마이페이지</h1>
      </div>
      <div css={S.contentStyle}>
        <Box sx={S.boxStyle}>
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
                label="가입년도"
                name="joinedYear"
                value={member?.joinedYear || ''}
                fullWidth
                onChange={handleChange}
                disabled
              />
              <TextField
                margin="normal"
                label="가입월"
                name="joinedMonth"
                value={member?.joinedMonth || ''}
                fullWidth
                onChange={handleChange}
                disabled
              />
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
                  <MenuItem key={statusType} value={statusType}>
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
              <Button
                component="label"
                fullWidth
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ height: '60px', marginTop: '15px', padding: '0px' }}
              >
                프로필 이미지
                <VisuallyHiddenInput type="file" accept="image/jpeg, image/png" onChange={(e) => handleImage(e)} />
              </Button>
            </div>
            <div css={S.buttonContainer}>
              <Button
                sx={{ mt: 2, mb: 2 }}
                variant="contained"
                onClick={handleSave}
              >
                저장
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}

import * as S from './styles.ts'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useForm, Controller, UseFormGetValues } from 'react-hook-form';
import { accessClient } from 'api/index.ts';
import { SHA256 } from "crypto-js";
import { useMutation } from '@tanstack/react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { AxiosError } from 'axios';

const track = [
  {
    id: 1,
    name: "BACKEND"
  },
  {
    id: 2,
    name: "FRONTEND"
  },
  {
    id: 3,
    name: "IOS"
  },
  {
    id: 4,
    name: "ANDROID"
  },
  {
    id: 5,
    name: "UI/UX"
  },
  {
    id: 6,
    name: "GAME"
  }
];

const status = [
  {
    value: 'ATTEND',
    label: '재학',
  },
  {
    value: 'OFF',
    label: '휴학',
  },
  {
    value: 'IPP',
    label: '현장실습',
  },
  {
    value: 'ARMY',
    label: '군 휴학',
  },
  {
    value: 'COMPLETION',
    label: '수료',
  },
  {
    value: 'GRADUATE',
    label: '졸업',
  },
];

const member = [
  {
    value: 'BEGINNER',
  },
  {
    value: 'REGULAR',
  },
  {
    value: 'MENTOR',
  }
]

type User = {
  joinDate: string,
  track: string,
  memberType: string,
  status: string,
  name: string,
  company: string,
  department: string,
  studentNumber: string,
  phoneNumber: string,
  email: string,
  password: string,
  githubName: string,
  profileImageUrl: string | null
}

const initialValue = {
  joinDate: '',
  track: '',
  memberType: '',
  status: '',
  name: '',
  company: '',
  department: '',
  studentNumber: '',
  phoneNumber: '',
  email: '',
  password: '',
  githubName: '',
  profileImageUrl: null
}

{/* eslint-disable */ }
const emailRegExp = new RegExp(/^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/);


const register = (user: User) => accessClient.post('/members/register',
  user)

const regist = async (user: User, getValues: UseFormGetValues<User>) => {
  const hash = SHA256(getValues('password')).toString();
  try {
    console.log(user)
    await register({ ...user, password: hash, profileImageUrl: null });
  }
  catch (e) {
    const err = e as AxiosError;
    console.log(err.response?.data)
  }
}

export default function SignUp() {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm<User>({
    mode: 'onChange',
    defaultValues: initialValue,
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['signup'],
    mutationFn: (user: User) => regist(user, getValues)
  });

  return (
    <form css={S.Template} onSubmit={handleSubmit((data) => mutate(data))}>
      {isPending &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <div css={S.InputSet}>
        <Controller
          name='name'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="이름"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.name}
            />
          }
        />
        <Controller
          name='studentNumber'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="학번"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.studentNumber}
            />
          }
        />
      </div>
      <div css={S.InputSet}>
        <Controller
          name='memberType'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              select
              label="멤버"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.memberType}
            >
              {member.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>}
        />
        <Controller
          name='joinDate'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="가입 시기"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.joinDate}
              helperText='ex) yyyy-mm-dd'
            />
          }
        />
      </div>
      <div css={S.InputSet}>
        <Controller
          name='track'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              select
              label="트랙"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.track}
            >
              {track.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>}
        />
        <Controller
          name='status'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              select
              label="학적"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.status}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>}
        />
      </div>
      <div css={S.InputSet}>
        <Controller
          name='phoneNumber'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="전화번호"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.phoneNumber}
              helperText='ex) 010-1234-5678'
            />
          }
        />
        <Controller
          name='password'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="비밀번호"
              variant="outlined"
              type='password'
              fullWidth
              {...field}
              error={!!errors.password}
            />}
        />
      </div>
      <div css={S.InputSet}>
        <Controller
          name='company'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="소속"
              variant="outlined"
              helperText='ex) 한국기술교육대학교'
              fullWidth
              {...field}
              error={!!errors.company}
            />
          }
        />
        <Controller
          name='department'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="부서"
              variant="outlined"
              helperText='ex) 컴퓨터공학부'
              fullWidth
              {...field}
              error={!!errors.department}
            />
          }
        />
      </div>
      <div css={S.InputSet}>
        <Controller
          name='email'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: emailRegExp,
              message: '이메일 형식이 맞지 않습니다.'
            }
          }}
          render={({ field }) =>
            <TextField
              label="이메일"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          }
        />
        <Controller
          name='githubName'
          control={control}
          rules={{
            required: true,
          }}
          render={({ field }) =>
            <TextField
              label="깃허브 이름"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.githubName}
            />
          }
        />
      </div>
      <div css={S.InputSet}>
        <Button variant="contained" type='submit'>회원가입</Button>
      </div>
    </form >
  )
}

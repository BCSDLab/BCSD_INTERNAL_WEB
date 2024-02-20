import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {
  useForm, Controller, UseFormGetValues,
} from 'react-hook-form';
import { SHA256 } from 'crypto-js';
import { useMutation } from '@tanstack/react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

/* eslint-disable  */
import { accessClient } from 'api/index.ts';
import * as S from './styles.ts';
import { useGetTracks } from 'query/tracks.ts';
import { SnackBarParam, useSnackBar } from 'ts/useSnackBar.tsx';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

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
] as const;

const member = [
  {
    value: 'BEGINNER',
  },
  {
    value: 'REGULAR',
  },
  {
    value: 'MENTOR',
  },
] as const;

type Member = {
  joinedYear: number,
  joinedMonth: number,
  trackId: number,
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
};

const initialValue = {
  joinedYear: new Date().getFullYear(),
  joinedMonth: new Date().getMonth(),
  trackId: 1,
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
  profileImageUrl: null,
};

{ /* eslint-disable */ }
const emailRegExp = new RegExp(/^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/);

const phoneNumberNegExp = new RegExp(/^\d{3}-\d{3,4}-\d{4}$/);


const register = (user: Member) => accessClient.post('/members/register', user)

export interface AxiosErrorMessage {
  message: string
}

const regist = async (
  user: Member,
  getValues: UseFormGetValues<Member>,
  joinedYear: number, joinedMonth:
    number,
  openSnackBar: ({ type, message }: SnackBarParam) => void) => {
  const hash = SHA256(getValues('password')).toString();
  try {
    await register({ ...user, password: hash, joinedYear: joinedYear, joinedMonth: joinedMonth });
  }
  catch (e) {
    const err = e as AxiosError;
    const { message } = (err.response?.data as AxiosErrorMessage);
    openSnackBar({ type: 'error', message: message })
  }
}

const date = new Date()
const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

export default function SignUp() {
  const { control, handleSubmit, formState: { errors }, getValues, clearErrors } = useForm<Member>({
    mode: 'onChange',
    defaultValues: initialValue,
  });
  const { data: track } = useGetTracks();
  const openSnackBar = useSnackBar();

  // Dayjs 타입을 사용하기에 부적절하다고 판단해서 새로운 state를 만듦
  const [days, setDays] = useState<Dayjs | null>(dayjs(year + '-' + month + '-' + day)); // 날짜 초기값 오늘 날짜로 임의 설정

  const navigate = useNavigate();

  const { isPending, mutate: signUp } = useMutation({
    mutationKey: ['signup'],
    mutationFn: ({ data, joinedYear, joinedMonth }: { data: Member, joinedYear: number, joinedMonth: number }) =>
      regist(data, getValues, joinedYear, joinedMonth, openSnackBar),
    onSuccess: () => {
      openSnackBar({ type: 'success', message: '회원가입에 성공했습니다.' })
      navigate('/login')
    },
    onError: (e) => openSnackBar({ type: 'error', message: e.message })
  });

  return (
    <form css={S.template} onSubmit={handleSubmit((data) => {
      if (days) {
        const format = days?.format('YYYY-MM-DD');
        const joinedYear = parseInt(format?.slice(0, 4));
        const joinedMonth = parseInt(format?.slice(5, 7));
        signUp({ data, joinedYear, joinedMonth })
      }
    }
    )
    }
    >
      <Snackbar
        open={!!errors.root}
        autoHideDuration={5000}
        message={errors.root?.message}
        onClose={() => clearErrors('root')}
      />
      {isPending &&
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
      <div css={S.inputSet}>
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
      <div css={S.inputSet}>
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
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
          <DatePicker
            label="가입 시기"
            value={days}
            onChange={(newDay) => setDays(newDay)}
          />
        </LocalizationProvider>
      </div>
      <div css={S.inputSet}>
        <Controller
          name='trackId'
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
              error={!!errors.trackId}
            >
              {track.map((option) => (
                <MenuItem key={option.id} value={option.id}>
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
      <div css={S.inputSet}>
        <Controller
          name='phoneNumber'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: phoneNumberNegExp,
              message: '전화번호가 올바르지 않습니다.'
            }
          }}
          render={({ field }) =>
            <TextField
              label="전화번호"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : 'ex) 010-1234-5678'}
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
      <div css={S.inputSet}>
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
      <div css={S.inputSet}>
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
      <div css={S.inputSet}>
        <Button variant="contained" type='submit' disabled={isPending}>회원가입</Button>
      </div>
    </form >
  )
}

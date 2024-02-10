import * as S from './styles.ts'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';

const track = [
  {
    value: 'FRONTEND',
  },
  {
    value: 'BACKEND',
  },
  {
    value: 'ANDROID',
  },
  {
    value: 'IOS',
  },
  {
    value: 'GAME',
  },
  {
    value: 'UIUX',
  },
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
}

const initialState: User = {
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
}

export default function SignUp() {
  const { control, handleSubmit, formState: { errors } } = useForm<User>({
    mode: 'onChange'
  });
  const sub = (data: User) => {
    console.log(data)
  }
  console.log(errors)
  return (
    <form css={S.Template} onSubmit={handleSubmit(sub)}>
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
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
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
          }}
          render={({ field }) =>
            <TextField
              label="이메일"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.email}
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

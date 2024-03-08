import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useLogin } from 'query/members';
import { SHA256 } from 'crypto-js';
import {
  TextField, Button, InputAdornment, OutlinedInput, IconButton, FormControl, InputLabel, Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './style';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '35vw',
  height: '60vh',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function SignIn() {
  const [visible, setVisible] = useState(false);
  const [account, setAccount] = useState({
    studentNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setVisible((prev) => !prev);
  };

  const { mutate: login, isPending } = useLogin();

  return (
    <div css={S.template}>
      <DemoPaper variant="elevation">
        <form
          css={S.center}
          onSubmit={(e) => {
            e.preventDefault();
            login({ studentNumber: account.studentNumber, password: SHA256(account.password).toString() });
          }}
        >
          <img src="https://image.bcsdlab.com/banner.png" alt="banner" css={S.image} />
          <FormControl sx={{ width: '25ch' }} variant="outlined">
            <TextField
              label="학번"
              variant="outlined"
              value={account.studentNumber}
              onChange={(e) => setAccount({ ...account, studentNumber: e.target.value })}
            />
          </FormControl>
          <FormControl sx={{ width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">비밀번호</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={visible ? 'text' : 'password'}
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                  >
                    {visible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              label="Password"
            />
          </FormControl>
          <div>
            <Button
              variant="contained"
              type="submit"
              sx={{ width: '100px', marginRight: '5px' }}
              disabled={isPending}
            >
              로그인
            </Button>
            <Button
              variant="contained"
              sx={{ width: '100px' }}
              onClick={() => navigate('/register')}
            >
              회원가입
            </Button>
          </div>
          <Link to="find-password" css={S.Link}>비밀번호를 잊으셨나요?</Link>
        </form>
      </DemoPaper>
    </div>
  );
}

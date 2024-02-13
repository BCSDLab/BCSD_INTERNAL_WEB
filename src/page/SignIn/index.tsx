import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useLogin } from 'query/members';
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

  const handleClickShowPassword = () => {
    setVisible((prev) => !prev);
  };

  const { mutate: login } = useLogin();

  return (
    <div css={S.template}>
      <DemoPaper variant="elevation">
        <form
          css={S.center}
          onSubmit={(e) => {
            e.preventDefault();
            login(account);
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
          <Button variant="contained" type="submit" onClick={() => login(account)}>로그인</Button>
        </form>
      </DemoPaper>
    </div>
  );
}

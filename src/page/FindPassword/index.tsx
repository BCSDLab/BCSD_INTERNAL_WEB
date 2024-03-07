import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import {
  ChangePasswordForm, RequestChangePassword, CertificationToken, ChangePassword,
} from 'model/member';
import { requestChangePassword, certificationToken, changePassword } from 'api/members';
import { SHA256 } from 'crypto-js';
import { useSnackBar } from 'ts/useSnackBar';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

const initialState = {
  email: '',
  token: '',
  password: '',
  passwordCheck: '',
};

interface Step {
  email: boolean,
  token: boolean,
  password: boolean,
}

const initialStep = {
  email: true,
  token: false,
  password: false,
};

export default function FindPassword() {
  const [passwordChangeInfo, setPasswordChangeInfo] = useState<ChangePasswordForm>(initialState);
  const [step, setStep] = useState<Step>(initialStep);
  const openSnackBar = useSnackBar();
  const navigate = useNavigate();

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeInfo({ ...passwordChangeInfo, email: e.target.value });
  };

  const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeInfo({ ...passwordChangeInfo, token: e.target.value });
  };

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeInfo({ ...passwordChangeInfo, password: e.target.value });
  };

  const handlePasswordCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChangeInfo({ ...passwordChangeInfo, passwordCheck: e.target.value });
  };

  const requestEamil = async (email: RequestChangePassword) => {
    try {
      await requestChangePassword(email);
      setStep({ ...step, token: true });
    } catch (e) {
      if (e instanceof AxiosError) openSnackBar({ type: 'error', message: e.response?.data.message });
    }
  };

  const certification = async (info: CertificationToken) => {
    try {
      await certificationToken(info);
      setStep({ ...step, password: true });
    } catch (e) {
      if (e instanceof AxiosError) openSnackBar({ type: 'error', message: e.response?.data.message });
    }
  };

  const change = async (info: ChangePassword) => {
    try {
      if (info.password === passwordChangeInfo.passwordCheck) {
        await changePassword({
          email: info.email,
          token: info.token,
          password: SHA256(info.password).toString(),
        });
        openSnackBar({ type: 'success', message: '비밀번호를 성공적으로 변경했습니다.' });
        navigate('/');
      } else {
        openSnackBar({ type: 'error', message: '비밀번호가 일치하지 않습니다.' });
      }
    } catch (e) {
      if (e instanceof AxiosError) openSnackBar({ type: 'error', message: e.response?.data.message });
    }
  };

  const changePasswordStep = () => {
    if (step.password) {
      change({
        email: passwordChangeInfo.email,
        token: passwordChangeInfo.token,
        password: passwordChangeInfo.password,
      });
    } else if (step.token) {
      certification({
        email: passwordChangeInfo.email,
        token: passwordChangeInfo.token,
      });
    } else requestEamil({ email: passwordChangeInfo.email });
  };

  return (
    <div css={S.layout}>
      <div css={S.container}>
        <img src="https://image.bcsdlab.com/banner.png" alt="bscd logo" css={S.image} />
        <p css={S.font}>
          {!step.password && !step.token && step.email && '가입하실 때 사용한 이메일을 입력해 주세요.'}
          {!step.password && step.token && '인증번호를 입력해 주세요.'}
          {step.password && '변경하실 비밀번호를 입력해 주세요.'}
        </p>
        <div css={S.inputSet}>
          <TextField
            label="email"
            variant="outlined"
            value={passwordChangeInfo.email}
            onChange={handleEmailInput}
            disabled={step.token}
          />
          {step.token
            && (
              <TextField
                label="인증번호"
                variant="outlined"
                value={passwordChangeInfo.token}
                onChange={handleTokenInput}
                disabled={step.password}
              />
            )}
          {step.password
            && (
              <TextField
                label="새 비밀번호"
                variant="outlined"
                value={passwordChangeInfo.password}
                onChange={handlePasswordInput}
                type="password"
              />
            )}
          {step.password
            && (
              <TextField
                label="새 비밀번호 확인"
                variant="outlined"
                value={passwordChangeInfo.passwordCheck}
                onChange={handlePasswordCheckInput}
                type="password"
              />
            )}
        </div>
        <Button
          variant="contained"
          onClick={changePasswordStep}
          css={S.button}
        >
          {step.password ? '변경' : '다음'}
        </Button>
      </div>
    </div>
  );
}

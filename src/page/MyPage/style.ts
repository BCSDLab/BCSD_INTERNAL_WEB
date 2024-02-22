import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const topBarTitle = css`
  margin-left: 20px;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray};
  width: 100%;
  height: 100vh;
`;

export const topBar = css`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
`;

export const boxStyle = {
  bgcolor: 'background.paper',
};

export const contentStyle = css`
  height: calc(100vh - 150px);
  background-color: ${colors.white};
  padding: 20px 70px 20px 70px;
`;

export const textGap = css`
  display: flex;
  gap: 50px;
`;

export const buttonWrapper = css`
  display: flex;
  gap: 20px;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
`;

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
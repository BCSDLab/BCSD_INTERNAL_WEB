import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray};
  height: calc(100vh - 100px);
  overflow: scroll;
  width: calc(100vw - 200px);
`;

export const boxStyle = {
  bgcolor: 'background.paper',
};

export const contentStyle = css`
  background-color: ${colors.white};
  padding: 20px 70px 20px 70px;
`;

export const textGap = css`
  display: flex;
  gap: 50px;
`;

export const buttonWrapper = css`
  display: flex;
  gap: 30px;
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

export const imageContainer = css`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;

export const profileImage = css`
  width: 150px;
  height: 150px;
  border: 1px solid ${colors.borderGray};
  padding: 10px;
`;

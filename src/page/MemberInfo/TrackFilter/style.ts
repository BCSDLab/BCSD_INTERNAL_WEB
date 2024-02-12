import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const sideBar = css`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: ${colors.gray};
  border-right: 1px solid ${colors.borderGray};
`;

export const topBar = css`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.borderGray};
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
  gap: 50px;
`;

export const layoutButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 30px;
  gap: 10px;
`;

export const container = css`
  display: flex;
  background-color: ${colors.gray};
  width: 100%;
  height: 100%;
`;

export const logo = css`
  width: 100%;
  margin-top: -10px;
`;

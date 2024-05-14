import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray};
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const contentContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const gridContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const createButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  margin-top: 50px;
`;

export const createButton = css`
  margin-right: 40px;
`;

export const teamContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 500px;
  height: 100%;
  gap: 20px;
`;

export const leaderProfileImage = css`
  width: 120px;
`;

export const teamTitle = css`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
`;

export const fontBold = css`
  font-weight: bold;
`;

export const infoWrapper = css`
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  font-size: 18px;
`;

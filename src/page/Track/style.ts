import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const topBarTitle = css`
  margin-left: 20px;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.gray};
  height: calc(100vh - 100px);
  overflow: scroll;
  width: 100%;
`;

export const contentContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const topBar = css`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const gridContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const trackContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 250px;
  gap: 20px;
`;

export const trackTitle = css`
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
`;

export const leaderTitle = css`
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  margin-right: 20px;
`;

export const leaderProfileImage = css`
  width: 120px;
`;

export const leaderName = css`
  display: inline-block;
  font-size: 18px;
`;

export const trackleaderWrapper = css`
  display: flex;
  align-items: center;
`;

export const createButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  height: 100%;
`;

export const createButton = css`
  margin-right: 40px;
`;

export const trackControlButtonWrapper = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;

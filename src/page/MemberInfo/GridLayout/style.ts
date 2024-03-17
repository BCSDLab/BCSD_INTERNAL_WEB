import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const memberContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`;

export const memberWrapper = css`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  gap: 13px;
  font-size: 15px;
  flex-shrink: 0;
`;

export const imageNameWrapper = css`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

export const image = css`
  width: 50%;
  height: 100%;
  object-fit: scale-down;
`;

export const name = css`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-right: 30px;
`;

export const memberInfoLabel = css`
  font-weight: bold;
  display: inline-block;
  justify-content: flex-start;
  width: 60px;
  margin-right: 10px;
`;

export const memberInfoLabelSmall = css`
  display: inline-block;
  font-size: 14px;
`;

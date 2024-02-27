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
`;

export const memberWrapper = css`
  width: 300px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 20px;
  gap: 15px;
`;

export const imageNameWrapper = css`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const image = css`
  width: 50%;
  height: 100%;
  object-fit: scale-down;
`;

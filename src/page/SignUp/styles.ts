import { css } from '@emotion/react';

export const template = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 2vh;
`;

export const inputSet = (isMobile: boolean) => css`
display: flex;
gap: 2vw;
width: ${isMobile ? '90vw' : '40vw'};
justify-content: center;
`;

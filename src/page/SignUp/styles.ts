import { css } from '@emotion/react';
import { mobile } from 'util/hooks/useMediaQuery';

export const template = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  gap: 2vh;
`;

export const inputSet = css`
display: flex;
gap: 2vw;
width: 40vw;
justify-content: center;

${mobile} {
  width: 90vw;
}
`;

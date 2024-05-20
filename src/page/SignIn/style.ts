import { css } from '@emotion/react';
import { mobile } from 'util/hooks/useMediaQuery';

export const template = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const center = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;
  height: 100%;
`;

export const image = css`
  width: 35vw;
  height: 20vh;
  object-fit: cover;

  ${mobile} {
    width: 100vw;
  }
`;

export const input = css`
  width: 200px;
`;

export const Link = css`
  text-decoration: none;
  color: black;
`;

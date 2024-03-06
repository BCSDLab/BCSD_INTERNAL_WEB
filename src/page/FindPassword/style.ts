import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 650px;
  border: 1px solid ${colors.borderGray};
  background-color: white;
  position: relative;
`;

export const inputSet = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  height: calc(650px - 325px);
  gap: 10px;
`;

export const button = css`
  width: 150px;
  height: 35px;
  margin-bottom: 20px;
`;

export const image = css`
  width: 400px;
  height: 251.144px;
  object-fit: fill;
`;

export const font = css`
  position: fixed;
  top: 260px;
  font-weight: bold;
  height: 20px;
`;

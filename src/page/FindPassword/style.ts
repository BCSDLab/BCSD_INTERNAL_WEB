import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const layout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export const container = (isMobile: boolean) => css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${isMobile ? '100vw' : '500px'};
  height: ${isMobile ? '100vh' : '650px'};
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

export const image = (isMobile: boolean) => css`
  width: ${isMobile ? '100vw' : '400px'};
  height: 251.144px;
  object-fit: fill;
`;

export const font = css`  
  margin-top: -40px;
  font-weight: bold;
  height: 20px;
`;

import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const top = css`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
`;

export const flex = css`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

export const syncButton = css`
  
`;

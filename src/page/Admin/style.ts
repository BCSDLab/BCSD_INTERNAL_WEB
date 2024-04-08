import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const container = css`
  width: 100%;
`;

export const image = css`
  height: 15vh;
  border-bottom: 1px solid ${colors.borderGray};
  padding-left: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

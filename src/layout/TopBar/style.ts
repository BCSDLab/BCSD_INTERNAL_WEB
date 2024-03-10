import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const top = css`
  width: calc(100vw - 230px);
  height: 100px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;
`;

import { css } from '@emotion/react';
import { mobile } from 'util/hooks/useMediaQuery';

export const paginationTitle = css`
  font-weight: bold;
  font-size: 20px;
  margin-top: 7px;

  ${mobile} {
    margin-top: 3px;
  }
`;

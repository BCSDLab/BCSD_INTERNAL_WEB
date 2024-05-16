import { css } from '@emotion/react';
import { colors } from 'const/colors/style';
import { mobile } from 'util/hooks/useMediaQuery';

export const top = css`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 30px;
  border-bottom: 1px solid ${colors.borderGray};
  box-sizing: border-box;

  ${mobile} {
    h1 {
      font-size: 18px;
    }
    padding-right: 10px;
  }
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

  ${mobile} {
    button {
      font-size: 12px;
      width: 65px;
      height: 35px;
      padding: 0;
    }
  }
`;

export const syncButton = css`
  
`;

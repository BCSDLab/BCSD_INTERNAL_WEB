import { css } from '@emotion/react';
import { colors } from 'const/colors/style';
import { mobile } from 'util/hooks/useMediaQuery';

export const sideBar = css`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: ${colors.gray};
  border-right: 1px solid ${colors.borderGray};
  box-sizing: border-box;

  ${mobile} {
    width: 175px;
  }
`;

export const topBar = css`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.borderGray};
`;

export const content = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const container = css`
  display: flex;
  background-color: ${colors.gray};
  height: 100vh;
`;

export const logo = css`
  width: 100%;
  margin-top: -10px;
  cursor: pointer;
`;

export const logOutButton = css`
  position: absolute;
  bottom: 30px;
  left: 50px;
`;

export const button = (props: boolean) => css`
  background-color: ${props ? '#ffeeff' : 'none'};
`;

export const duesButton = () => css`
  display: flex;
  align-items: center;
`;

export const duesGroup = css`
  display: flex;
  flex-direction: column;

`;

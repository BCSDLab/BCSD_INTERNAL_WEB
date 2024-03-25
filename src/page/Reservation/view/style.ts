import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

const background = [
  '#FCB9AA', '#FFDBCC', '#C6DBDA', 'A2E1DB', '55CBCD',
];

export const layout = css`
  display: flex;
  flex-wrap: wrap;
`;

export const Cell = (isToday: boolean) => css`
  border: 1px solid ${colors.borderGray};
  box-sizing: border-box;
  height: 100px;
  width: calc(100% / 7);
  position: relative;
  overflow: hidden;
  background-color: ${isToday && '#ECEAE4'};
`;

export const Date = (isToday: boolean) => css`
  position: absolute;
  top: 2px;
  left: 2px;
  font-weight: ${isToday && 'bold'};
`;

export const schedule = (index: number) => css`
  width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background-color: ${background[index]};
  border-radius: 10px;
  padding-left: 10px;
  margin-bottom: 3px;
`;

export const space = css`
  height: 20px;
`;

export const AlignItems = css`
  display: flex;
  align-items: center;
`;

export const current = css`
  width: 100px;
  text-align: center;
`;

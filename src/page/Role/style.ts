import { css } from '@emotion/react';

export const container = css`
  height: 100%;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const pagination = css`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const createButton = css`
  position: absolute;
  left: 30px;
`;

export const paginationTitle = css`
  font-weight: bold;
  font-size: 20px;
  margin-top: 7px;
`;

export const content = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const gridTitle = css`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export const gridWrapper = (itemCount: number) => {
  const columnCount = itemCount > 4 ? 4 : itemCount;
  return css`
  display: grid;
  grid-template-columns: repeat(${columnCount}, 1fr);
  min-height: 200px;
  margin: 20px 0;
  padding: 10px;
  `;
};

export const memberContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`;

export const memberWrapper = css`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
  gap: 15px;
  font-size: 15px;
`;

export const imageNameWrapper = css`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

export const image = css`
  width: 50%;
  height: 100%;
  object-fit: scale-down;
`;

export const name = css`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-right: 30px;
`;

export const memberInfoLabel = css`
  font-weight: bold;
  display: inline-block;
  justify-content: flex-start;
  width: 60px;
  margin-right: 10px;
`;

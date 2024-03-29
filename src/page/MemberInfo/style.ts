import { css } from '@emotion/react';

const color = {
  gray: '#F9FAFB',
  borderGray: '#e0e0e0',
};

export const sideBar = css`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: ${color.gray};
  border-right: 1px solid ${color.borderGray};
`;

export const topBar = css`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  background-color: ${color.gray};
  border-bottom: 1px solid ${color.borderGray};
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const topBarTitle = css`
  margin-left: 20px;
`;

export const contentContainer = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const viewContent = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

export const buttonContainer = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
  gap: 30px;
`;

export const layoutButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 20px;
  gap: 10px;
`;

export const container = css`
  display: flex;
  flex-direction: column;
  background-color: ${color.gray};
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

export const logo = css`
  width: 100%;
  margin-top: -10px;
`;

export const createButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const createButton = css`
  width: 130px;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

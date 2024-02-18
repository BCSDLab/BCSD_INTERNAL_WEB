import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const container = css`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${colors.gray};
`;

export const sidebar = css`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: calc(100vh - 10px);
  background-color: ${colors.gray};
  border-right: 1px solid ${colors.borderGray};
`;

export const logo = css`
  width: 100%;
  margin-top: -10px;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

export const topBar = css`
  width: 100%;
  height: 100px;
  background-color: ${colors.gray};
  border-bottom: 1px solid ${colors.borderGray};
  display: flex;
  align-items: center;
`;

export const topBarTitle = css`
  margin-left: 16px;
`;

export const mainContent = css`
  position: relative;
  width: 95%;
  min-height: calc(100vh - 250px);
`;

export const buttonGroup = css`
  margin: 20px 0;
`;

export const fileUploadButton = css`
  position: relative;
`;

export const fileUpload = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const modalContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: hidden;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
  padding: 24px;
  color: #212121;
`;

export const modalContent = css`
  display: flex;
  flex-direction: column;
`;

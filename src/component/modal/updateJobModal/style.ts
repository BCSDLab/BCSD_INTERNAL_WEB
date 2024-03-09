import { css } from '@emotion/react';

export const updateButton = css`
  margin: 10px;
  height: 40px;
`;

export const modal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background-color: #ffffff;
  box-shadow: 24px;
  padding: 4px;
`;

export const modalContent = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const textField = css`
  width: 270px;
  margin: 10px;
`;

export const modalTitle = css`
  margin: 20px 0 20px 10px;
`;

export const jobSelection = css`
  width: 270px;
  margin: 10px;
`;

export const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 50px;
  gap: 20px;
`;

export const closeButton = css`
  margin-right: 20px;
`;

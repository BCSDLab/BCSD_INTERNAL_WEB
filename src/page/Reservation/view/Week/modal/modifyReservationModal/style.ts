import { css } from '@emotion/react';

export const reservationModal = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background-color: #ffffff;
  box-shadow: 24px;
  padding: 16px;
`;

export const reservationModalTitle = css`
  
`;

export const reservationTextFieldWrapper = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 30px;
`;

export const buttonGroup = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 80px;
  gap: 16px;
`;

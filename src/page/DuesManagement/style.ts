import { css } from '@emotion/react';

export const container = css`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const searchName = css`
  display: flex;
  justify-content: end;
  width: 90vw;
  margin-bottom: 8px;
`

export const dues = css`
  height: 80vh;
  width: 90vw;
`;

export const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

export const filterModalButton = css`
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 150ms ease;
  cursor: pointer;
  background: '#fff';
  border: 1px solid #eeeeee;
  color: #212121;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

  &:hover {
    background: #fafafa;
    border-color: #e0e0e0;
  }

  &:active {
    background: #f5f5f5
  }

  &:focus-visible {
    box-shadow: 0 0 0 4px #90caf9;
    outline: none;
  }
`

export const filterModal = css`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const filterModalContainer = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
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
`

export const filterModalContent = css`
  display: flex;
  flex-direction: column;
`
import { css } from '@emotion/react';

const box = `
  display: flex;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 10px;
`;

const tableFont = `
  text-align: center;
  font-size: 0.9rem;
`;

export const container = css`
  width: calc(100vw - 100px);
`;

export const pagination = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  min-width: 260px;
`;

export const memberInfoBox = css`
  ${box}
  margin-bottom: 10px;
  min-width: 250px;
`;

export const memberProfile = css`
  width: 70px;
  height: 70px;
  object-fit: cover;
`;

export const memberDetailInfo = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const memberInfo = css`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

export const memberName = css`
  font-size: 1rem;
  font-weight: bold;
`;

export const memberTrackName = css`
  font-size: 0.8rem;
  color: #666;
`;

export const unpaidCountInfo = css`
  font-size: 0.9rem;
  font-weight: bold;
  margin-right: 20px;
`;

export const tableHeader = css`
  ${tableFont}
  font-weight: bold;
`;

export const tableBody = css`
  ${tableFont}
  padding: 10px;
`;

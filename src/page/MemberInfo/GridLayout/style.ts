import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const memberContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 10px 0 10px;
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
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
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

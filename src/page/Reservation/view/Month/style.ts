import { css } from '@emotion/react';
import { colors } from 'const/colors/style';

export const Style = css`
  position: 'absolute';
  top: '50%';
  left: '50%';
  transform: 'translate(-50%, -50%)';
  width: 600px;
  height: 400px;
  background-color: #ffffff;
  border: '2px solid #000';
  box-shadow: 24px;
  padding: 4px;
`;

export const Detail = css`
  border: 1px solid ${colors.borderGray};
  padding: 7px;
  margin-bottom: 3px;
`;

export const DetailLayout = css`
  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 */
  }
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: scroll;
  height: 400px;
`;

export const ReservationLayout = css`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
`;

export const TimeLayout = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const AlignItems = css`
  display: flex;
  align-items: center;
`;

export const SpaceBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const ReserveContainer = css`
  border: 1px solid ${colors.borderGray};
  padding: 7px;
  height: 350px;
  margin-top: 30px;
`;

export const DetailContainer = css`
  display: flex;
  justify-content: space-between;
`;

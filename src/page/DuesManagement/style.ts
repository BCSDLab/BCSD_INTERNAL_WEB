import { css } from '@emotion/react';
import { colors } from 'const/colors/style';
import { DuesDetail } from 'model/dues/allDues';

export const sidebar = css`
  display: flex;
  flex-direction: column;
  width: 250px;
  min-height: calc(100vh - 10px);
  background-color: ${colors.gray};
  border-right: 1px solid ${colors.borderGray};
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

export const content = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

export const mainContent = css`
  position: relative;
  width: 95%;
  min-height: calc(100vh - 250px);
`;

export const container = css`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: ${colors.gray};
`;

export const logo = css`
  width: 100%;
  margin-top: -10px;
`;

export const searchAndPagination = css`
  position: relative;
  display: flex;
  justify-content: end;
  width: calc(100% - 100px);
  margin: 10px 0;
`;

export const pagination = css`
  position: absolute;
  right: 44%;
  display: flex;
`;

export const paginationTitle = css`
  font-weight: bold;
  font-size: 20px;
  margin-top: 4px;
`;

export const tableContainer = css`
  overflow-x: initial;
`;

export const tableHeader = css`
  background-color: #1877f2;
  color: #ffffff;
  text-align: center;
`;

export const trackTableCell = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const dues = css`
  width: calc(100% - 100px);
  height: 100%;
`;

export const filterModalButton = css`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid #eeeeee;
  color: #212121;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

export const filterModal = css`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
`;

export const checkboxFieldset = css`
  margin: 5px;
`;

export const filterModalContent = css`
  display: flex;
  flex-direction: column;
`;

export const tableBodyCell = css`
  text-align: center;
`;

// 미납 | 납부 | 면제 | null(아직 납부 달이 지나지 않음)
// popover를 여는 버튼은 미납, 면제일 때만 보이도록 함
export const memoTableCell = (props: DuesDetail) => {
  let backgroundColor = 'default';

  switch (props.status) {
    case 'NOT_PAID':
      backgroundColor = '#ff5630';
      break;
    case 'SKIP':
    case 'PAID':
      backgroundColor = '#00a76f';
      break;
    default:
      backgroundColor = 'default';
      break;
  }

  return css`
    cursor: ${props.status === 'NOT_PAID' || props.status === 'SKIP' ? 'pointer' : 'default'};
    background-color: ${backgroundColor};
    text-align: center;
    border-right: 1px solid #e0e0e0;
    min-width: 38px;;
  `;
};

export const memoPopover = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  min-width: 150px;
  min-height: 70px;
`;

export const memoPopoverText = css`
  margin-top: 15px;
  color: #212121;
  text-align: center;
`;

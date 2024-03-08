import { css } from '@emotion/react';
import { colors } from 'const/colors/style';
import { DuesDetail } from 'model/dues/allDues';

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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 250px);
`;

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;
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
  margin-top: 7px;
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
  align-items: center;
`;

export const nameTableCell = css`
  display: flex;
  align-items: center;
`;

export const dues = css`
  width: calc(100% - 100px);
  height: 100%;
`;

export const sortLogo = css`
  color: #ffffff;
`;

export const sortPopover = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  min-width: 150px;
  min-height: 70px;
`;

export const sortPopoverButtonGroup = css`
  margin-top: 8px;
  display: flex;
  gap: 8px;
`;

export const filterModalButton = css`
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
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
      backgroundColor = colors.notPaid;
      break;
    case 'SKIP':
      backgroundColor = colors.success;
      break;
    case 'PAID':
      backgroundColor = colors.success;
      break;
    default:
      backgroundColor = 'default';
      break;
  }

  return css`
    cursor: pointer;
    background-color: ${backgroundColor};
    border-right: 1px solid #e0e0e0;
    min-width: 38px;
    text-align: center;
  `;
};

export const editStatusModalContainer = css`
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

export const editStatusModalContent = css`
  display: flex;
  flex-direction: column;
`;

export const memoInput = css`
  margin-bottom: 10px;
`;

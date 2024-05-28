import { css } from '@emotion/react';

export const container = css`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
`;

export const teamContainer = css`
  width: 800px;
  text-align: center;
`;

export const teamBottom = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  gap: 10px;
`;

export const teamMembers = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 5px;
`;

export const teamMemberInfo = css`
  color: gray;
  cursor: pointer;
`;

export const modalView = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const searchMemberResult = {
  maxHeight: 200, // 최대 높이 설정
  overflow: 'auto', // 넘칠 경우 스크롤
};

export const addTeamButton = {
  margin: 'auto',
  width: 800,
  textAlign: 'center',
};

export const teamBottomButton = {
  whiteSpace: 'nowrap',
};

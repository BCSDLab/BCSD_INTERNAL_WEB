import { css } from '@emotion/react';

export const buttonContainer = css`
  display: flex;
  justify-content: space-between;
`;

export const buttonWrapper = css`
  display: flex;
  gap: 20px;
`;

export const listButton = {
  border: 1,
  borderColor: 'gray',
  borderRadius: 2,
  marginBottom: 1,
  '&:hover': {
    backgroundColor: '#F44336',
  },
};

export const teamMemberList = {
  maxHeight: 300,
  overflow: 'auto',
};

import { css } from '@emotion/react';

export const textGap = css`
  display: flex;
  gap: 20px;
`;

export const buttonContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const buttonWrapper = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const modalStyle = css`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 600px;
background-color: 'background.paper';
box-shadow: 24px;
padding: 4px;
`;

export const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

import { css } from '@emotion/react';
import { Paper, PaperProps, styled } from '@mui/material';

interface ItemProps extends PaperProps {
  authority?: 'ADMIN' | 'MANAGER' | 'NORMAL';
}

export const Item = styled(Paper)<ItemProps>(({ theme, authority }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ':hover': {
    cursor: authority === 'ADMIN' || authority === 'MANAGER' ? 'pointer' : 'default',
    boxShadow: authority === 'ADMIN' || authority === 'MANAGER' ? theme.shadows[4] : 'default',
  },
}));

export const container = css`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const pagination = css`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

export const createButton = css`
  position: absolute;
  left: 30px;
`;

export const paginationTitle = css`
  font-weight: bold;
  font-size: 20px;
  margin-top: 7px;
`;

export const content = css`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const gridTitle = css`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

export const gridWrapper = () => {
  return css`
  width: 100%;
  display: grid;
  justify-items: center;  
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  min-height: 200px;
  margin: 20px 0;
  padding: 10px;
  `;
};

export const memberContainer = css`
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px 10px 0 10px;
  border-radius: 10px;
`;

export const memberWrapper = css`
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 15px;
  padding-bottom: 20px;
  gap: 15px;
  font-size: 15px;
`;

export const imageNameWrapper = css`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
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

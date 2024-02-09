import styled from '@emotion/styled';
import {styled as mui} from '@mui/material/styles';

export const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100vh;
  background-color: #F9FAFB;
  border-right: 1px solid #e0e0e0;
`;

export const TopBar = styled.div`
  width: 100%;
  height: 100px;
  background-color: #F9FAFB;
  border-bottom: 1px solid #e0e0e0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  background-color: #F9FAFB;
  width: 100%;
  height: 100%;
`;

export const Logo = styled.img`
  width: 100%;
  margin-top: -10px;
`;

export const SideBarButton = mui('button')`
  variant: 'outlined',
  color: 'secondary',
`;
import { Button, ToggleButton } from '@mui/material';
import { useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import * as S from './style';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';
import TrackFilter from './TrackFilter';

export default function MemberInfo() {
  // 임시로 local storage에 access token을 저장
  localStorage.setItem('access_token', import.meta.env.VITE_REACT_APP_ACCESS_TOKEN);
  const [layout, setLayout] = useState('list');
  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>
          회원정보
        </Button>
      </div>
      <div css={S.contentContainer}>
        <div css={S.topBar} />
        <div css={S.buttonContainer}>
          <TrackFilter />
          <div css={S.layoutButtonContainer}>
            <ToggleButton
              value="list"
              selected={layout === 'list'}
              onChange={() => setLayout('list')}
            >
              <ViewListIcon />
            </ToggleButton>
            <ToggleButton
              value="module"
              selected={layout === 'module'}
              onChange={() => setLayout('module')}
            >
              <ViewModuleIcon />
            </ToggleButton>
          </div>
        </div>
        <div css={S.content}>
          {layout === 'list' ? <ListLayout /> : <GridLayout />}
        </div>
      </div>
    </div>
  );
}

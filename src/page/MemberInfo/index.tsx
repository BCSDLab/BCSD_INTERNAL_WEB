import { Button } from '@mui/material';
import * as S from './style';
import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';


export default function MemberInfo() {
  const [layout, setLayout] = useState('list')
  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="/BCSD_logo-01.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>회원정보</Button>
      </div>
      <div css={S.contentContainer}>
        <div css={S.topBar}></div>
        <div css={S.content}>
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
          {layout === 'list' ? (
            <ListLayout />
          ) : (
            <GridLayout />
          )}
      </div>
    </div>
  </div>
  );
}
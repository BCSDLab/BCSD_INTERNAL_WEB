import { Button } from '@mui/material';
import * as S from './style';
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';

export default function MemberInfo() {
  const [layout, setLayout] = useState('list');
  const [track, setTrack] = useState('all');
  const handleTrackChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setTrack(newAlignment);
  };
  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button variant="outlined" color="secondary" sx={{ marginTop: '20px' }}>
          회원정보
        </Button>
      </div>
      <div css={S.contentContainer}>
        <div css={S.topBar}></div>
        <div css={S.buttonContainer}>
          <ToggleButtonGroup
            color="primary"
            value={track}
            exclusive
            onChange={handleTrackChange}
            aria-label="Platform"
          >
            <ToggleButton value="all" sx={{ width: '85px' }}>
              ALL
            </ToggleButton>
            <ToggleButton
              value="frontend"
              sx={{ textTransform: 'none', width: '85px' }}
            >
              FrontEnd
            </ToggleButton>
            <ToggleButton
              value="backend"
              sx={{ textTransform: 'none', width: '85px' }}
            >
              BackEnd
            </ToggleButton>
            <ToggleButton
              value="android"
              sx={{ textTransform: 'none', width: '85px' }}
            >
              Android
            </ToggleButton>
            <ToggleButton
              value="ios"
              sx={{ textTransform: 'none', width: '85px' }}
            >
              iOS
            </ToggleButton>
            <ToggleButton value="uiux" sx={{ width: '85px' }}>
              UI/UX
            </ToggleButton>
            <ToggleButton
              value="etc"
              sx={{ textTransform: 'none', width: '85px' }}
            >
              etc
            </ToggleButton>
          </ToggleButtonGroup>
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

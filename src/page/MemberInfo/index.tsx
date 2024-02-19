import {
  Button, FormControlLabel, Switch, ToggleButton,
} from '@mui/material';
import { Suspense, useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import * as S from './style';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';
import TrackFilter from './TrackFilter';

export default function MemberInfo() {
  const [layout, setLayout] = useState('list');
  const [deleteMemberChecked, setDeleteMemberChecked] = useState(false);

  const handleChangedDeleteMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteMemberChecked(event.target.checked);
  };

  return (
    <div css={S.container}>
      <div css={S.topBar} />
      <div css={S.buttonContainer}>
        <FormControlLabel control={<Switch checked={deleteMemberChecked} onChange={handleChangedDeleteMember} />} label="탈퇴 회원" />
        <Suspense fallback={<div />}>
          <TrackFilter />
        </Suspense>
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
        <Suspense fallback={<div />}>
          {layout === 'list' ? <ListLayout deleteMemberChecked={deleteMemberChecked} /> : <GridLayout />}
        </Suspense>
      </div>
    </div>

  );
}

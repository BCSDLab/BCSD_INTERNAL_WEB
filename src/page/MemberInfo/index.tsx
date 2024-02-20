import {
  Button, FormControlLabel, Switch, ToggleButton, css,
} from '@mui/material';
import { Suspense, useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MemberCreateModal from 'component/modal/memberCreateModal';
import * as S from './style';
import ListLayout from './ListLayout';
import GridLayout from './GridLayout';
import TrackFilter from './TrackFilter';

export default function MemberInfo() {
  const [layout, setLayout] = useState('list');
  const [deleteMemberChecked, setDeleteMemberChecked] = useState(false);
  const [memberCreateModalOpen, setMemberCreateModalOpen] = useState(false);

  const handleChangedDeleteMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteMemberChecked(event.target.checked);
  };

  const handleCloseMemberCreateModal = () => {
    setMemberCreateModalOpen(false);
  };

  return (
    <div css={S.container}>
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>회원 정보</h1>
      </div>
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
      <MemberCreateModal
        open={memberCreateModalOpen}
        onClose={handleCloseMemberCreateModal}
      />
    </div>

  );
}

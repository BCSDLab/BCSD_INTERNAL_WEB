import {
  Button, FormControlLabel, Switch, ToggleButton,
} from '@mui/material';
import { Suspense, useState } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
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

  const handleOpenMemberCreateModal = () => {
    setMemberCreateModalOpen(true);
  };

  const handleCloseMemberCreateModal = () => {
    setMemberCreateModalOpen(false);
  };

  return (
    <div css={S.container}>
      <div css={S.sideBar}>
        <img src="https://image.bcsdlab.com/banner.png" alt="logo" css={S.logo} />
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: '20px' }}
        >
          회원정보
        </Button>
      </div>
      <div css={S.contentContainer}>
        <div css={S.topBar} />
        <div css={S.buttonContainer}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenMemberCreateModal}
          >
            생성
          </Button>
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
      <MemberCreateModal
        open={memberCreateModalOpen}
        onClose={handleCloseMemberCreateModal}
      />
    </div>
  );
}

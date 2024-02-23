import {
  Button,
  FormControlLabel, Switch, ToggleButton,
} from '@mui/material';
import { useState, Suspense } from 'react';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import MemberCreateModal from 'component/modal/memberCreateModal';
import AddIcon from '@mui/icons-material/Add';
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
      <div css={S.topBar}>
        <h1 css={S.topBarTitle}>회원 정보</h1>
      </div>
      <div>
        <div css={S.buttonContainer}>
          <FormControlLabel control={<Switch checked={deleteMemberChecked} onChange={handleChangedDeleteMember} sx={{ marginLeft: 2 }} />} label="탈퇴 회원" />
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
        <div css={S.viewContent}>
          <Suspense fallback={<div />}>
            {layout === 'list' ? <ListLayout deleteMemberChecked={deleteMemberChecked} /> : <GridLayout />}
          </Suspense>
          <div css={S.createButtonContainer}>
            <div css={S.createButton}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={handleOpenMemberCreateModal}
              >
                회원 생성
              </Button>
            </div>
          </div>
        </div>
        <MemberCreateModal
          open={memberCreateModalOpen}
          onClose={handleCloseMemberCreateModal}
        />
      </div>
    </div>

  );
}

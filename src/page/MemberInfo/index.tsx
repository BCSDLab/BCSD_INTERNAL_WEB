import {
  FormControlLabel, Switch, ToggleButton,
} from '@mui/material';
import { useState } from 'react';
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
      <div css={S.topBar} />
      <div css={S.buttonContainer}>
        <FormControlLabel control={<Switch checked={deleteMemberChecked} onChange={handleChangedDeleteMember} />} label="탈퇴 회원" />
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
        {layout === 'list' ? <ListLayout deleteMemberChecked={deleteMemberChecked} /> : <GridLayout />}
      </div>
      <MemberCreateModal
        open={memberCreateModalOpen}
        onClose={handleCloseMemberCreateModal}
      />
    </div>

  );
}

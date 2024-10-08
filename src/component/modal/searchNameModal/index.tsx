import {
  useState, useEffect, useCallback, memo, useMemo,
} from 'react';
import {
  Typography, Box, List, TextField, ListItemText, Modal, ListItemButton,
} from '@mui/material';
import { useSearchMembers } from 'query/members';
import { Member } from 'model/member';
import * as S from './style';

interface SearchMemberModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (member: Member) => void;
}

function SearchNameModal({
  open, onClose, onSelect,
}: SearchMemberModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);

  const { data: membersResult } = useSearchMembers({
    pageIndex: 0, pageSize: 1000, name: searchQuery,
  });

  useEffect(() => {
    if (membersResult) {
      setSearchResults(membersResult.content);
    } else {
      setSearchResults([]);
    }
  }, [membersResult]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const renderSearchResults = useMemo(() => (
    searchResults
      .filter((member) => (member.isDeleted === false && member.memberType === 'REGULAR'))
      .map((member) => (
        <ListItemButton
          key={member.id}
          sx={S.listButton}
          onClick={() => {
            onSelect(member);
            onClose();
          }}
        >
          <ListItemText primary={`${member.name} (${member.track.name})`} />
        </ListItemButton>
      ))
  ), [searchResults, onSelect, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={S.modalView}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          추가할 사용자를 검색하세요
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
          autoFocus
        />
        <Box sx={S.searchMemberResult}>
          <List>
            {renderSearchResults}
          </List>
        </Box>
      </Box>
    </Modal>
  );
}

export default memo(SearchNameModal);

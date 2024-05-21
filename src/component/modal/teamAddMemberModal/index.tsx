import {
  useState, useEffect, useCallback, memo, useMemo,
} from 'react';

import {
  Typography, Box, List, TextField, ListItem, ListItemText, Modal,
} from '@mui/material';
import { useSearchMembers } from 'query/members';
import { Member } from 'model/member';
import * as S from './style';

interface SearchMemberModalProps {
  open: boolean;
  onClose: () => void;
}

const SearchModal = memo(({ open, onClose }: SearchMemberModalProps) => {
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

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const renderSearchResults = useMemo(() => (
    searchResults.map((member) => (
      <ListItem key={member.id} button>
        <ListItemText primary={member.name} />
      </ListItem>
    ))
  ), [searchResults]);

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
          // value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
        <Box sx={S.searchMemberResult}>
          <List>
            {renderSearchResults}
          </List>
        </Box>
      </Box>
    </Modal>
  );
});

export default SearchModal;

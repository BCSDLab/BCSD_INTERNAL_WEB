import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMembers, useGetMembersNotDeleted } from 'query/members';
import { useTrackStore } from 'store/trackStore';
import { Button } from '@mui/material';
import MemberInfoModal from 'component/modal/memberInfoModal';
import { Member, STATUS_LABEL } from 'model/member';

interface ListLayoutProps {
  deleteMemberChecked: boolean;
}

export default function ListLayout({ deleteMemberChecked }: ListLayoutProps) {
  const { id } = useTrackStore();
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: id });
  const { data: membersNotDeleted } = useGetMembersNotDeleted({
    pageIndex: 0, pageSize: 1000, trackId: id, deleted: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'trackName', headerName: '트랙', width: 130 },
    { field: 'memberType', headerName: '직책', width: 130 },
    { field: 'status', headerName: '상태', width: 100 },
    { field: 'company', headerName: '소속', width: 160 },
    { field: 'department', headerName: '학부', width: 130 },
    { field: 'studentNumber', headerName: '학번', width: 130 },
    { field: 'phoneNumber', headerName: '전화번호', width: 150 },
    { field: 'email', headerName: '이메일', width: 220 },
    {
      field: 'update',
      headerName: '정보수정',
      width: 100,
      renderCell: (data) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            setMemberInfo(data.row);
            handleOpenModal();
          }}
        >
          수정
        </Button>
      ),
    },
  ];

  return (
    <div style={{ height: 650, paddingLeft: 20, paddingRight: 20 }}>
      <DataGrid
        rows={
            deleteMemberChecked
              ? members.content.map((member) => ({
                ...member,
                status: STATUS_LABEL[member.status],
                trackName: member.track.name,
                track: member.track,
              }))
              : membersNotDeleted.content.map((member) => ({
                ...member,
                status: STATUS_LABEL[member.status],
                trackName: member.track.name,
                track: member.track,
              }))
          }
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        sx={{ paddingLeft: 2, paddingRight: 2 }}
      />
      <MemberInfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        member={memberInfo}
      />
    </div>
  );
}

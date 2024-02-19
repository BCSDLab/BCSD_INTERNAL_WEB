import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMembers } from 'query/members';
import { useTrackStore } from 'store/trackStore';
import { Button } from '@mui/material';
import MemberInfoModal from 'component/modal/memberInfoModal';
import { Member } from 'model/member';

const STATUS_LABEL: { readonly [key: string]: string } = {
  ATTEND: '재학',
  OFF: '휴학',
  IPP: '현장실습',
  ARMY: '군 휴학',
  COMPLETION: '수료',
  GRADUATE: '졸업',
} as const;

export default function ListLayout() {
  const { id } = useTrackStore();
  const { data: members } = useGetMembers({ pageIndex: 0, pageSize: 1000, trackId: id });
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
        rows={members.content.map((member) => ({
          ...member, status: STATUS_LABEL[member.status], trackName: member.track.name, track: member.track,
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
      />
      <MemberInfoModal
        open={modalOpen}
        onClose={handleCloseModal}
        member={memberInfo}
      />
    </div>
  );
}

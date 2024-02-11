import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetMembers } from 'query/members';
import { useTrackStore } from 'store/trackStore';

const columns: GridColDef[] = [
  { field: 'name', headerName: '이름', width: 100 },
  { field: 'track', headerName: '트랙', width: 130 },
  { field: 'memberType', headerName: '직책', width: 100 },
  { field: 'status', headerName: '상태', width: 100 },
  { field: 'company', headerName: '소속', width: 160 },
  { field: 'department', headerName: '학부', width: 130 },
  { field: 'studentNumber', headerName: '학번', width: 130 },
  { field: 'phoneNumber', headerName: '전화번호', width: 150 },
  { field: 'email', headerName: '이메일', width: 150 },
];

interface Member {
  id: number;
  name: string;
  track: Track;
  memberType: string;
  status: string;
  company: string;
  department: string;
  studentNumber: string;
  phoneNumber: string;
  email: string;
}

interface Track {
  id: number;
  name: string;
}

export default function ListLayout() {
  const { id } = useTrackStore();
  const { data } = useGetMembers(0, 100, id || '');
  const members = data.content.map((member: Member) => ({
    id: member.id,
    name: member.name,
    track: member.track.name,
    memberType: member.memberType,
    status: member.status,
    company: member.company,
    department: member.department,
    studentNumber: member.studentNumber,
    phoneNumber: member.phoneNumber,
    email: member.email,
  }));

  return (
    <div style={{ height: 650, paddingLeft: 20, paddingRight: 20 }}>
      <DataGrid
        rows={members}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}

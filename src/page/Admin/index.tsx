import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useAcceptMember } from 'query/admin';
import { useNotAuthedMember } from 'query/members';
import * as S from './style';

export default function AcceptMember() {
  const { data: members } = useNotAuthedMember();
  const { mutate: accept } = useAcceptMember();

  const columns: GridColDef[] = [
    { field: 'name', headerName: '이름', width: 100 },
    { field: 'track', headerName: '트랙', width: 130 },
    { field: 'memberType', headerName: '직책', width: 130 },
    { field: 'status', headerName: '상태', width: 100 },
    { field: 'company', headerName: '소속', width: 160 },
    { field: 'department', headerName: '학부', width: 130 },
    { field: 'studentNumber', headerName: '학번', width: 130 },
    { field: 'phoneNumber', headerName: '전화번호', width: 150 },
    { field: 'email', headerName: '이메일', width: 220 },
    {
      field: 'accept',
      headerName: '승인',
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={(event) => {
            event.stopPropagation();
            accept(params.row.id);
          }}
        >
          승인
        </Button>
      ),
    },
  ];
  return (
    <div css={S.container}>
      <div style={{
        height: '70vh', paddingLeft: 20, paddingRight: 20,
      }}
      >
        <DataGrid
          rows={members.content.map((member) => ({
            ...member, track: member.track.name,
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10]}
          sx={{
            paddingLeft: 2, paddingRight: 2,
          }}
        />
      </div>

    </div>
  );
}

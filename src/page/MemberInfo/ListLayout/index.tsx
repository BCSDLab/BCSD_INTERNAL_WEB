import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: '이름', width: 70 },
  { field: 'track', headerName: '트랙', width: 100 },
  { field: 'memberType', headerName: '직책', width: 100 },
  { field: 'status', headerName: '상태', width: 100 },
  { field: 'company', headerName: '소속', width: 100 },
  { field: 'department', headerName: '학부', width: 130 },
  { field: 'studentNumber', headerName: '학번', width: 130 },
  { field: 'phoneNumber', headerName: '전화번호', width: 130 },
  { field: 'email', headerName: '이메일', width: 130 },
];

const rows = [
  {
    id: 1, lastName: 'Snow', firstName: 'Jon', age: 35,
  },
  {
    id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42,
  },
  {
    id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45,
  },
  {
    id: 4, lastName: 'Stark', firstName: 'Arya', age: 16,
  },
  {
    id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,
  },
  {
    id: 6, lastName: 'Melisandre', firstName: null, age: 150,
  },
  {
    id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,
  },
  {
    id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,
  },
  {
    id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,
  },
];

export default function ListLayout() {
  return (
    <div style={{ height: 400, paddingLeft: 20, paddingRight: 20 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {

            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const DataGridTable = (props) => {

  const { hideId = false, data: {columns = [], items = []}, handleCellClick } = props;

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        rows={items}
        columns={columns}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
          columns: {
            columnVisibilityModel: {
              _id: hideId,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          _id: hideId,
        }}
        onCellClick={handleCellClick}
      />
    </Box>
  );

  };

  export default DataGridTable;
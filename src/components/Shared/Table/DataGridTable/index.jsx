/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { IconButton, Box } from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { getColumnNames, organiceData } from '../../../../helpers/tableHelpers';

/* eslint-disable react/prop-types */
const Table = ({ rawData, setOpenDeleteModal, setOpenFormModal, setItemRow, setItemId }) => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (rawData?.length > 0) {
      const fieldNamesTransdormed = getColumnNames(rawData[0]);
      setColumns(fieldNamesTransdormed);
      const data = organiceData(rawData);
      setTableData(data);
    }
  }, [rawData]);

  const handleOpenEditForm = (row) => {
    setItemRow(row);
    setOpenFormModal(true);
  };

  const handleOpenDeleteModal = (rowId) => {
    setItemId(rowId);
    setOpenDeleteModal(true);
  };

  const columnsWithActions = columns.concat([
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => {
              handleOpenEditForm(params.row);
            }}
          >
            <Edit
              sx={{
                color: '#656ED3',
                border: '2px solid #656ED3',
                borderRadius: '5px',
              }}
            />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => {
              handleOpenDeleteModal(params.row.id);
            }}
          >
            <Close
              sx={{
                backgroundColor: '#D36565',
                color: 'white',
                border: '1px solid #D36565',
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </div>
      ),
    },
  ]);

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
      <DataGrid
        rows={tableData}
        columns={columnsWithActions}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        disableColumnMenu={true}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
      />
    </Box>
  );
};

export default Table;

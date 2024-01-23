/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton } from '@mui/material';
import { getColumnNames } from '../../../helpers/tableHelpers';
import { useState, useEffect } from 'react';
import { Close, Edit } from '@mui/icons-material';

/**
 * The DataGridTable is a functional component that renders a shared Table, which allows the view of professionals and technologies.
 * @param {Array} paramList It expects an array of objects to display in the table.
 * @param {Function} actionEditButton is a function to open the edit modal of an entity within the table.
 * @param {Function} actionDeleteButton is a function to open the delete modal of an entity within the table.
 */

const DataGridTable = ({ paramList, actionEditButton, actionDeleteButton }) => {
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    if (paramList?.length > 0) {
      const fieldNamesTransformed = getColumnNames(paramList[0]);
      setColumnNames([
        ...fieldNamesTransformed,
        {
          field: 'actions',
          headerName: 'Actions',
          headerAlign: 'center',
          width: 100,
          renderCell: (params) => (
            <>
              <IconButton aria-label="edit" onClick={() => actionEditButton(params.row)}>
                <Edit
                  sx={{
                    color: '#656ED3',
                    border: '2px solid #656ED3',
                    borderRadius: '5px',
                  }}
                />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => actionDeleteButton(params.row._id)}>
                <Close
                  sx={{
                    backgroundColor: '#D36565',
                    color: 'white',
                    border: '1px solid #D36565',
                    borderRadius: '5px',
                  }}
                />
              </IconButton>
            </>
          ),
        },
      ]);
    }
  }, [paramList]);

  return (
    <Box sx={{ height: 650, width: '100%', marginTop: '1em' }}>
      <DataGrid
        sx={{ backgroundColor: '#fff' }}
        rows={paramList}
        columns={columnNames}
        getRowId={(row) => row._id}
        hideFooterPagination
        disableColumnMenu
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataGridTable;

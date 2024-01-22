import styles from './index.module.css';
import propTypes from 'prop-types';
import { IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit, Close } from '@mui/icons-material';

const SharedTable = ({ data: { columns = [], items = [] }, deleteAction, editAction }) => {
  const columnsWithActions = [
    ...columns,
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      headerAlign: 'center',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => editAction(params.row)}>
            <Edit
              sx={{
                color: '#656ED3',
                border: '2px solid #656ED3',
                borderRadius: '5px',
              }}
            />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => deleteAction(params.row.id)}>
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
  ];
  return (
    <div className={styles.table}>
      <DataGrid
        rows={items}
        columns={columnsWithActions}
        getRowId={(row) => row._id}
        checkboxSelection={false}
        hideFooterPagination
        disableColumnMenu
      />
    </div>
  );
};

SharedTable.propTypes = {
  data: propTypes.object,
  deleteAction: propTypes.func,
  editAction: propTypes.func,
};

export default SharedTable;

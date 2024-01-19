/* eslint-disable react/prop-types */
import styles from './index.module.css';
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from '@mui/material';
import { Edit, Close } from '@mui/icons-material';

const SharedTable = ({ data: { columns = [], items = [] }, deleteAction, editAction }) => {
  return (
    <TableContainer sx={{ maxHeight: 665 }} className={styles.table}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} sx={{ color: '#334d6e88' }}>
                {column.headerName}
              </TableCell>
            ))}
            <TableCell sx={{ color: '#334d6e88', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            {columns.map((column) => (
              <TableCell key={column.field}>{row[column.field]}</TableCell>
            ))}
            <TableCell key={index} sx={{ paddingTop: 0, paddingBottom: 0, textAlign: 'center' }}>
              <IconButton aria-label="edit" onClick={() => {}}>
                <Edit
                  sx={{
                    color: '#656ED3',
                    border: '2px solid #656ED3',
                    borderRadius: '5px',
                  }}
                  onClick={() => editAction(row)}
                />
              </IconButton>
              <IconButton aria-label="delete">
                <Close
                  sx={{
                    backgroundColor: '#D36565',
                    color: 'white',
                    border: '1px solid #D36565',
                    borderRadius: '5px',
                  }}
                  onClick={() => deleteAction(row._id)}
                />
              </IconButton>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;

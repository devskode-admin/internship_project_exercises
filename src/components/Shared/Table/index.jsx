/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  IconButton,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import styles from './index.module.css';
import { createColumns, transformedFields } from '../../../helpers/tableHelper'

const SharedTable = ({ rawData, handleDeleteModal, handleEditModal }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (rawData?.length > 0) {
      const keys = createColumns(rawData);
      setColumns(keys);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  return (
    <TableContainer sx={{ maxHeight: 665 }} className={styles.table}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rawData?.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {transformedFields(row).map(([fieldName, fieldValue]) => (
                <TableCell key={fieldName}>{fieldValue}</TableCell>
              ))}
              <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    handleEditModal(row);
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
                    handleDeleteModal(row._id);
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SharedTable;

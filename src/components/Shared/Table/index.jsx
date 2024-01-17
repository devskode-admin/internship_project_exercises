/* eslint-disable react/prop-types */
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableContainer,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import styles from './index.module.css';
import { useState, useEffect } from 'react';
import { getColumnNames, organiceData } from '../../../helpers/tableHelpers';

const SharedTable = ({ paramList, actionEditButton, actionDeleteButton }) => {
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    if (paramList?.length > 0) {
      const fieldNamesTransdormed = getColumnNames(paramList[0]);
      setColumnNames(fieldNamesTransdormed);
    }
  }, [paramList]);

  return (
    <TableContainer sx={{ maxHeight: 665 }} className={styles.table}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {columnNames?.map((name, index) => {
              return (
                <TableCell key={index} sx={{ color: '#334d6e88' }}>
                  {name}
                </TableCell>
              );
            })}
            <TableCell sx={{ color: '#334d6e88' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paramList?.map((row, index) => (
            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {organiceData(row).map(([fieldName, fieldValue]) => (
                <TableCell key={fieldName} component="th" scope="row">
                  {fieldValue}
                </TableCell>
              ))}
              <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    actionEditButton(row);
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
                <IconButton aria-label="delete" onClick={() => actionDeleteButton(row._id)}>
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

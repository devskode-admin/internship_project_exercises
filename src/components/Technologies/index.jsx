/* eslint-disable react-hooks/exhaustive-deps */
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useEffect } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getTechnologies } from '../../redux/technologySlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Technologies = () => {
  const dispatch = useDispatch();
  const technologiesList = useSelector((state) => state.technologies.list);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  return (
    <div className={styles.generalContainer}>
      <SideBar />
      <div className={styles.mainContainer}>
        <h1>Technologies List</h1>
        <Table sx={{ minWidth: 650 }} className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#334d6e88' }}>Name</TableCell>
              <TableCell sx={{ color: '#334d6e88' }}>Development Side</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {technologiesList?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.development_side}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Technologies;

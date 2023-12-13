/* eslint-disable react-hooks/exhaustive-deps */
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { useEffect } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getProfessionals } from '../../redux/professionalSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  return (
    <div className={styles.generalContainer}>
      <SideBar />
      <div className={styles.mainContainer}>
        <h1>Professionals List</h1>
        <Table sx={{ minWidth: 650 }} className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#334d6e88' }}>First Name</TableCell>
              <TableCell sx={{ color: '#334d6e88' }}>Last Name</TableCell>
              <TableCell sx={{ color: '#334d6e88' }}>Email</TableCell>
              <TableCell sx={{ color: '#334d6e88' }}>Role</TableCell>
              <TableCell sx={{ color: '#334d6e88' }}>Module</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {professionalsList?.map((row) => (
              <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.first_name}
                </TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.module}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Professionals;

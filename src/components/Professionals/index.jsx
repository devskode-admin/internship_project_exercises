/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionals, deleteProfessional } from '../../redux/professionalSlice.js';
import styles from './index.module.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);
  const [itemId, setItemId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openconfirmModal, setOpenconfirmModal] = useState(false);

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  const deleteItem = async () => {
    await dispatch(deleteProfessional(itemId));
    setOpenconfirmModal(false);
  };

  return (
    <div className={styles.generalContainer}>
      {openDeleteModal ? (
        <Modal
          typeModal="delete"
          action={() => {
            setOpenconfirmModal(true);
            setOpenDeleteModal(false);
          }}
          close={() => setOpenDeleteModal(false)}
        />
      ) : (
        ''
      )}
      {openconfirmModal ? (
        <Modal typeModal="" action={() => deleteItem()} close={() => setOpenconfirmModal(false)} />
      ) : (
        ''
      )}
      <SideBar />
      <div className={styles.mainContainer}>
        <h1>Professionals List</h1>
        <TableContainer sx={{ maxHeight: 665 }} className={styles.table}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#334d6e88' }}>First Name</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Last Name</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Email</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Role</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Module</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Actions</TableCell>
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
                  <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        setItemId(row._id);
                        setOpenDeleteModal(true);
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
      </div>
    </div>
  );
};

export default Professionals;

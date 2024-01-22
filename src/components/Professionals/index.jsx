/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getProfessionals, deleteProfessional } from '../../redux/professionalSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Shared/Modal/index.jsx';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);
  const [idState, setIdState] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  const deleteItem = async () => {
    const response = await dispatch(deleteProfessional(idState));
    setOpenModal(false);
    if (response.error) {
      setAlert({
        isOpen: true,
        message: response.error.message,
        type: 'error',
      });
    } else {
      setAlert({
        isOpen: true,
        message: response.payload.data.message,
        type: 'success',
      });
    }
  };

  const closeAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      isOpen: false,
      message: alert.message,
      type: alert.type,
    });
  };

  return (
    <div className={styles.generalContainer}>
      {openModal && (
        <Modal
          action={() => deleteItem()}
          close={() => setOpenModal(false)}
          text={'Are you sure you want to delete an item?'}
          isDelete
        />
      )}
      <Snackbar open={alert.isOpen} autoHideDuration={3000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
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
                        setIdState(row._id);
                        setOpenModal(true);
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

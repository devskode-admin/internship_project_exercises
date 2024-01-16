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
  Button,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getProfessionals, deleteProfessional } from '../../redux/professionalSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formProfessional/form.jsx';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);
  const [idState, setIdState] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const [openFormModal, setOpenFormModal] = useState(false);

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

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

  const deleteItem = async () => {
    const response = await dispatch(deleteProfessional(idState));
    setOpenDeleteModal(false);
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

  const openForm = () => {
    setIdState('');
    setOpenFormModal(true);
  };

  return (
    <div className={styles.generalContainer}>
      <FormModal
        isOpen={openFormModal}
        professionalParam={idState}
        action={() => setOpenFormModal(false)}
      />
      <Modal
        isOpen={openDeleteModal}
        actionDelete={() => deleteItem()}
        close={() => setOpenDeleteModal(false)}
      />
      <Snackbar open={alert.isOpen} autoHideDuration={3000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <SideBar />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h1>Professionals List</h1>
          <Button aria-label="add" size="small" variant="contained" onClick={openForm}>
            Create Professional
          </Button>
        </div>
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
                      aria-label="edit"
                      onClick={() => {
                        setIdState(row);
                        setOpenFormModal(true);
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
                        setIdState(row._id);
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

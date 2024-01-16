/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Snackbar,
  Alert,
  TableContainer,
  Button,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getTechnologies, deleteTechnology } from '../../redux/technologySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formTech/form.jsx';

const Technologies = () => {
  const dispatch = useDispatch();
  const technologiesList = useSelector((state) => state.technologies.list);
  const [idState, setIdState] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const [openFormModal, setOpenFormModal] = useState(false);

  useEffect(() => {
    dispatch(getTechnologies());
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
    const response = await dispatch(deleteTechnology(idState));
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
        technologyParam={idState}
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
          <h1>Technologies List</h1>
          <Button aria-label="add" size="small" variant="contained" onClick={openForm}>
            Create Technology
          </Button>
        </div>
        <TableContainer sx={{ maxHeight: 665 }} className={styles.table}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#334d6e88' }}>Name</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Development Side</TableCell>
                <TableCell sx={{ color: '#334d6e88' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {technologiesList?.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.development_side}</TableCell>
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

export default Technologies;

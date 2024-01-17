/* eslint-disable react-hooks/exhaustive-deps */
import { Snackbar, Alert, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';
import { getTechnologies, deleteTechnology } from '../../redux/technologySlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formTech/form.jsx';
import SharedTable from '../Shared/Table/index.jsx';

const Technologies = () => {
  const dispatch = useDispatch();
  const technologiesList = useSelector((state) => state.technologies.list);
  const [idState, setIdState] = useState('');
  const [techState, setTechState] = useState('');
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

  const handleOpenEditForm = (row) => {
    setTechState(row);
    setOpenFormModal(true);
  };

  const handleOpenDeleteModal = (rowId) => {
    setIdState(rowId);
    setOpenDeleteModal(true);
  };

  return (
    <div className={styles.generalContainer}>
      <FormModal
        isOpen={openFormModal}
        technologyParam={techState}
        handleCloseForm={() => setOpenFormModal(false)}
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
          <Button
            aria-label="add"
            size="small"
            variant="contained"
            onClick={() => {
              setTechState('');
              setOpenFormModal(true);
            }}
          >
            Create Technology
          </Button>
        </div>
        <SharedTable
          paramList={technologiesList}
          actionEditButton={handleOpenEditForm}
          actionDeleteButton={handleOpenDeleteModal}
        />
      </div>
    </div>
  );
};

export default Technologies;

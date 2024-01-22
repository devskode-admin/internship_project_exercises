/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionals, deleteProfessional } from '../../redux/professionalSlice.js';
import styles from './index.module.css';
import { Button } from '@mui/material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formProfessional/form.jsx';
import SharedTable from '../Shared/Table/index.jsx';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);
  const [itemId, setItemId] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [professionalData, setProfessionalData] = useState('');

  useEffect(() => {
    dispatch(getProfessionals());
  }, []);

  const deleteItem = async () => {
    const response = await dispatch(deleteProfessional(itemId));
    setOpenDeleteModal(false);
    if (response.error) {
      alert(response.error.message);
    }
  };

  const openForm = () => {
    setProfessionalData('');
    setOpenFormModal(true);
  };

  const handleDeleteModal = (id) => {
    setOpenDeleteModal(true);
    setItemId(id);
  };

  const handleEditModal = (row) => {
    setOpenFormModal(true);
    setProfessionalData(row);
  };

  return (
    <div className={styles.generalContainer}>
      {openFormModal && (
        <FormModal
          professionalParam={professionalData}
          handleCloseForm={() => setOpenFormModal(false)}
        />
      )}
      {openDeleteModal && (
        <Modal actionDelete={() => deleteItem()} close={() => setOpenDeleteModal(false)} />
      )}
      <SideBar />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h1>Professionals List</h1>
          <Button aria-label="add" size="small" variant="contained" onClick={openForm}>
            Create Professional
          </Button>
        </div>
        <SharedTable
          rawData={professionalsList}
          handleDeleteModal={handleDeleteModal}
          handleEditModal={handleEditModal}
        />
      </div>
    </div>
  );
};

export default Professionals;

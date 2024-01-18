/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnologies, deleteTechnology } from '../../redux/technologySlice.js';
import styles from './index.module.css';
import { Button } from '@mui/material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formTech/form.jsx';
import DataGridTable from '../Shared/DataGridTable/index.jsx';

const Technologies = () => {
  const dispatch = useDispatch();
  const technologiesList = useSelector((state) => state.technologies.list);
  const [itemId, setItemId] = useState('');
  const [tech, setTech] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  const deleteItem = async () => {
    const response = await dispatch(deleteTechnology(itemId));
    setOpenDeleteModal(false);
    if (response.error) {
      alert(response.error.message);
    }
  };

  const openForm = () => {
    setOpenFormModal(true);
  };

  const handleOpenEditForm = (row) => {
    setTech(row);
    setOpenFormModal(true);
  };

  const handleOpenDeleteModal = (rowId) => {
    setItemId(rowId);
    setOpenDeleteModal(true);
  };

  return (
    <div className={styles.generalContainer}>
      {openFormModal && (
        <FormModal
          technologyParam={tech}
          handleCloseForm={() => {
            setTech('');
            setOpenFormModal(false);
          }}
        />
      )}
      {openDeleteModal && (
        <Modal actionDelete={() => deleteItem()} close={() => setOpenDeleteModal(false)} />
      )}
      <SideBar />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h1>Technologies List</h1>
          <Button aria-label="add" size="small" variant="contained" onClick={openForm}>
            Create Technology
          </Button>
        </div>
        <DataGridTable
          paramList={technologiesList}
          actionEditButton={handleOpenEditForm}
          actionDeleteButton={handleOpenDeleteModal}
        />
      </div>
    </div>
  );
};

export default Technologies;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnologies, deleteTechnology } from '../../redux/technologySlice.js';
import styles from './index.module.css';
import { Button } from '@mui/material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formTech/form.jsx';
import SharedTable from '../Shared/Table/index.jsx';
import dataForTable from '../Helpers/index.jsx';

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
        <SharedTable
          data={dataForTable(technologiesList, ['_id'], true)}
          deleteAction={(id) => {
            setItemId(id);
            setOpenDeleteModal(true);
          }}
          editAction={(row) => {
            setTech(row);
            setOpenFormModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default Technologies;

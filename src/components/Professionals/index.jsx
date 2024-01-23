/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfessionals, deleteProfessional } from '../../redux/professionalSlice.js';
import styles from './index.module.css';
import { Button} from '@mui/material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formProfessional/form.jsx';
import Table from './../Shared/Table/DataGridTable/index.jsx';

const Professionals = () => {
  const dispatch = useDispatch();
  const professionalsList = useSelector((state) => state.professionals.list);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [itemRow, setItemRow] = useState('');
  const [itemId, setItemId] = useState('');


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
    setItemRow('');
    setOpenFormModal(true);
  };

  return (
    <div className={styles.generalContainer}>
      {openFormModal && (
        <FormModal
          professionalParam={itemRow}
          handleCloseForm={() => {
            setItemRow('');
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
          <h1>Professionals List</h1>
          <Button aria-label="add" size="small" variant="contained" onClick={openForm}>
            Create Professional
          </Button>
        </div>
        <Table
          rawData={professionalsList}
          setOpenDeleteModal={setOpenDeleteModal}
          setOpenFormModal={setOpenFormModal}
          setItemRow={setItemRow}
          setItemId={setItemId}
        />
      </div>
    </div>
  );
};

export default Professionals;

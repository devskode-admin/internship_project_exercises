/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton, Snackbar, Alert } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Add, Edit, Close, Search } from '@mui/icons-material';
import { useState } from 'react';
import FormModal from './FormModal/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import styles from './index.module.css';
import SideBar from '../Shared/SideBar/index.jsx';

const Technologies = () => {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const [idState, setId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      isOpen: false,
      message: alert.message,
      type: alert.type,
    });
  };

  const handleEditClick = (id) => {
    setId(id);
    setOpenModal(true);
  };

  const openForm = () => {
    setId('');
    setOpenModal(true);
  };

  const handleDeleteConfirm = (id) => {
    setId(id);
    setOpenConfirmModal(true);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 450, headerClassName: styles.headerColumn },
    {
      field: 'development_side',
      headerName: 'Development Side',
      width: 450,
      headerClassName: styles.headerColumn,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      headerClassName: styles.headerColumn,
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" onClick={() => handleEditClick(params.row)}>
            <Edit
              sx={{
                color: '#656ED3',
                border: '2px solid #656ED3',
                borderRadius: '5px',
              }}
            />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDeleteConfirm(params.row._id)}>
            <Close
              sx={{
                backgroundColor: '#D36565',
                color: 'white',
                border: '2px solid #D36565',
                borderRadius: '5px',
              }}
            />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      _id: 1,
      name: 'JavaScript',
      development_side: 'FullStack',
    },
    {
      _id: 2,
      name: 'HTML',
      development_side: 'Frontend',
    },
    {
      _id: 3,
      name: 'CSS',
      development_side: 'Frontend',
    },
    {
      _id: 4,
      name: 'Node.js',
      development_side: 'Backend',
    },
    {
      _id: 5,
      name: 'React',
      development_side: 'Frontend',
    },
  ];

  return (
    <div className={styles.generalContainer}>
      <FormModal isOpen={openModal} technology={idState} action={() => setOpenModal(false)} />
      <Modal
        text={'Are you sure you want to delete it?'}
        isOpen={openConfirmModal}
        id={idState}
        image={'/images/circle.png'}
        isDelete={true}
        close={() => setOpenConfirmModal(false)}
      />
      <Snackbar open={alert.isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <SideBar />
      <div className={styles.mainContainer}>
        <h1>Technologies</h1>
        <div className={styles.headerContainer}>
          <div className={styles.searchBarContainer}>
            <input type="search" className={styles.searchBar} placeholder={`search`} />
            <Search className={`${styles.searchIcon}`} />
          </div>
          <IconButton aria-label="add" size="large" onClick={openForm}>
            <Add className={styles.addButton} fontSize="large" />
          </IconButton>
        </div>
        <DataGrid
          className={styles.table}
          sx={{ height: 595, width: '100%' }}
          rows={rows}
          getRowId={(row) => row._id}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection={false}
          disableRowSelectionOnClick
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default Technologies;

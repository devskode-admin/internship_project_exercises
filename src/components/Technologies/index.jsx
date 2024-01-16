/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTechnologies, deleteTechnology } from '../../redux/technologySlice.js';
import styles from './index.module.css';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TableContainer,
  Button,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import SideBar from '../Shared/SideBar/index.jsx';
import Modal from '../Shared/Modal/index.jsx';
import FormModal from './formTech/form.jsx';

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
                        setTech(row);
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

export default Technologies;

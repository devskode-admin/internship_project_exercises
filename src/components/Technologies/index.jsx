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
import { Close } from '@mui/icons-material';
import SideBar from '../Shared/SideBar';
import ConfirmModal from '../Shared/ConfirmModal';
import FormTechnology from './FormTech';

const Technologies = () => {
  const dispatch = useDispatch();
  const technologiesList = useSelector((state) => state.technologies.list);
  const [itemId, setItemId] = useState('');
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
    } else {
      dispatch(getTechnologies());
    }
  };

  return (
    <div className={styles.generalContainer}>
      {openFormModal && <FormTechnology handleCloseForm={() => setOpenFormModal(false)} />}
      {openDeleteModal && (
        <ConfirmModal
          type="Delete"
          action={() => deleteItem()}
          close={() => setOpenDeleteModal(false)}
        />
      )}
      <SideBar />
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h1>Technologies List</h1>
          <Button
            aria-label="add"
            size="small"
            variant="contained"
            onClick={() => setOpenFormModal(true)}
          >
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

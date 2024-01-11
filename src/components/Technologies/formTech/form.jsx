/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { createTechnology } from '../../../redux/technologySlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const FormModal = ({ isOpen, action }) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm({ mode: 'onChange' });

  useEffect(() => {
    reset();
  }, [action]);

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

  const onSubmit = async (data) => {
    const response = await dispatch(createTechnology(data));
    if (response.error) {
      setAlert({
        isOpen: true,
        message: response.error.message,
        type: 'error',
      });
    } else {
      reset();
      action();
    }
  };

  return isOpen ? (
    <div className={styles.modalContainer}>
      <Snackbar open={alert.isOpen} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
      <div className={styles.wrapper}>
        <div className={styles.closeIcon}>
          <IconButton
            aria-label="cancel"
            onClick={() => {
              action();
              reset();
            }}
          >
            <Close />
          </IconButton>
        </div>
        <h2 className={styles.title}>{'Add Technology'}</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <div>
              <TextField fullWidth label="Name" name="name" {...register('name')} />
            </div>
            <div>
              <TextField
                fullWidth
                select
                label="Development Side"
                name="development_side"
                {...register('development_side')}
              >
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Fullstack">Fullstack</MenuItem>
              </TextField>
            </div>
          </div>
          <div className={styles.buttonCreateContainer}>
            <Button size="large" sx={{ width: 230, height: 45 }} type="submit" variant="contained">
              {'Create'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default FormModal;

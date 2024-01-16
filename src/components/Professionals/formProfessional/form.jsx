/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { createProfessional } from '../../../redux/professionalSlice.js';
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
  }, [isOpen]);

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
    const response = await dispatch(createProfessional(data));
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
        <h2 className={styles.title}>{'Add Professional'}</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <div>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                {...register('first_name')}
              />
            </div>
            <div>
              <TextField fullWidth label="Last Name" name="last_name" {...register('last_name')} />
            </div>
            <div>
              <TextField fullWidth label="Email" name="email" {...register('email')} />
            </div>
            <div>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                {...register('password')}
              />
            </div>
            <div>
              <TextField fullWidth select label="Role" name="role" {...register('role')}>
                <MenuItem value="Director">Director</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField fullWidth select label="Module" name="module" {...register('module')}>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
                <MenuItem value="Full Stack Course">Course</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Onboarding">Onboarding</MenuItem>
                <MenuItem value="Tracking">Tracking</MenuItem>
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

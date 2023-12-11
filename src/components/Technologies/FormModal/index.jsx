/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { createProfessionals, editProfessionals } from '../../../redux/professionalSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const FormModal = ({ isOpen, action, technology }) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (technology) {
      setValue('name', technology.name);
      setValue('development_side', technology.development_side);
    } else {
      reset();
    }
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
    if (technology) {
      const payload = {
        id: technology._id,
        body: data,
      };
      const response = await dispatch(editProfessionals(payload));
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
    } else {
      const response = await dispatch(createProfessionals(data));
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
        <h2 className={styles.title}>{technology ? 'Edit Technology' : 'Add Technology'}</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <div>
              <TextField
                fullWidth
                label="Name"
                name="name"
                {...register('name')}
                error={!!errors.name}
              />
              <p className={styles.helperText}>{errors.name ? errors.name.message : ''}</p>
            </div>
            <div>
              <TextField
                fullWidth
                select
                label="Development Side"
                name="development_side"
                {...register('development_side')}
                defaultValue={technology ? technology.development_side : ''}
                error={!!errors.development_side}
              >
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="FullStack">FullStack</MenuItem>
              </TextField>
              <p className={styles.helperText}>
                {errors.development_side ? errors.development_side.message : ''}
              </p>
            </div>
          </div>
          <div className={styles.buttonCreateContainer}>
            <Button size="large" sx={{ width: 230, height: 45 }} type="submit" variant="contained">
              {technology ? 'Save Changes' : 'Create'}
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

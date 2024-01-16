/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { createTechnology, editTechnology } from '../../../redux/technologySlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import technologySchema from '../../../validations/technologies.js';
import { joiResolver } from '@hookform/resolvers/joi';

const FormModal = ({ isOpen, handleCloseForm, technologyParam }) => {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    type: 'success',
  });
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange', resolver: joiResolver(technologySchema) });

  useEffect(() => {
    if (technologyParam) {
      setValue('name', technologyParam?.name);
      setValue('development_side', technologyParam?.development_side);
    } else {
      reset();
    }
  }, [isOpen, technologyParam]);

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
    if (technologyParam) {
      const payload = {
        _id: technologyParam._id,
        body: data,
      };
      const response = await dispatch(editTechnology(payload));
      if (response.error) {
        setAlert({
          isOpen: true,
          message: response.error.message,
          type: 'error',
        });
      } else {
        reset();
        handleCloseForm();
      }
    } else {
      const response = await dispatch(createTechnology(data));
      if (response.error) {
        setAlert({
          isOpen: true,
          message: response.error.message,
          type: 'error',
        });
      } else {
        reset();
        handleCloseForm();
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
              reset();
              handleCloseForm();
            }}
          >
            <Close />
          </IconButton>
        </div>
        <h2 className={styles.title}>{technologyParam ? 'Edit Technology' : 'Add Technology'}</h2>
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
                defaultValue={technologyParam ? technologyParam?.development_side : ''}
                {...register('development_side')}
                error={!!errors.development_side}
              >
                <MenuItem value="Backend">Backend</MenuItem>
                <MenuItem value="Frontend">Frontend</MenuItem>
                <MenuItem value="Fullstack">Fullstack</MenuItem>
              </TextField>
              <p className={styles.helperText}>
                {errors.development_side ? errors.development_side.message : ''}
              </p>
            </div>
          </div>
          <div className={styles.buttonCreateContainer}>
            <Button size="large" sx={{ width: 230, height: 45 }} type="submit" variant="contained">
              {technologyParam ? 'Edit' : 'Create'}
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

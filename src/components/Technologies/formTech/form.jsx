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

const FormModal = ({ isOpen, action, technolgyParam }) => {
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
    if (technolgyParam) {
      setValue('name', technolgyParam?.name);
      setValue('development_side', technolgyParam?.development_side);
    } else {
      reset();
    }
  }, [action, technolgyParam]);

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
    if (technolgyParam) {
      const payload = {
        _id: technolgyParam._id,
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
        action();
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
              reset();
              action();
            }}
          >
            <Close />
          </IconButton>
        </div>
        <h2 className={styles.title}>{technolgyParam ? 'Edit Technology' : 'Add Technology'}</h2>
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
                defaultValue={technolgyParam ? technolgyParam?.development_side : ''}
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
              {technolgyParam ? 'Edit' : 'Create'}
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, Snackbar, Alert, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './form.module.css';
import { useEffect, useState } from 'react';
import { createProfessional, editProfessional } from '../../../redux/professionalSlice.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import professionalSchema from '../../../validations/professionals.js';
import { joiResolver } from '@hookform/resolvers/joi';

const FormModal = ({ isOpen, action, professionalParam }) => {
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
  } = useForm({ mode: 'onChange', resolver: joiResolver(professionalSchema) });

  useEffect(() => {
    if (professionalParam) {
      setValue('first_name', professionalParam?.first_name);
      setValue('last_name', professionalParam?.last_name);
      setValue('email', professionalParam?.email);
      setValue('password', professionalParam?.password);
      setValue('role', professionalParam?.role);
      setValue('module', professionalParam?.module);
    } else {
      reset();
    }
  }, [action, professionalParam]);

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
    if (professionalParam) {
      const payload = {
        _id: professionalParam._id,
        body: data,
      };
      const response = await dispatch(editProfessional(payload));
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
        <h2 className={styles.title}>
          {professionalParam ? 'Edit Professional' : 'Add Professional'}
        </h2>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputsContainer}>
            <div>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                {...register('first_name')}
                error={!!errors.first_name}
              />
              <p className={styles.helperText}>
                {errors.first_name ? errors.first_name.message : ''}
              </p>
            </div>
            <div>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                {...register('last_name')}
                error={!!errors.last_name}
              />
              <p className={styles.helperText}>
                {errors.last_name ? errors.last_name.message : ''}
              </p>
            </div>
            <div>
              <TextField
                fullWidth
                label="Email"
                name="email"
                {...register('email')}
                error={!!errors.email}
              />
              <p className={styles.helperText}>{errors.email ? errors.email.message : ''}</p>
            </div>
            <div>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                {...register('password')}
                error={!!errors.password}
              />
              <p className={styles.helperText}>{errors.password ? errors.password.message : ''}</p>
            </div>
            <div>
              <TextField
                fullWidth
                select
                label="Role"
                name="role"
                defaultValue={professionalParam ? professionalParam.role : ''}
                {...register('role')}
                error={!!errors.role}
              >
                <MenuItem value="Director">Director</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="QA">QA</MenuItem>
              </TextField>
              <p className={styles.helperText}>{errors.role ? errors.role.message : ''}</p>
            </div>
            <div>
              <TextField
                fullWidth
                select
                label="Module"
                name="module"
                defaultValue={professionalParam ? professionalParam.module : ''}
                {...register('module')}
                error={!!errors.module}
              >
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
                <MenuItem value="Course">Course</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Onboarding">Onboarding</MenuItem>
                <MenuItem value="Tracking">Tracking</MenuItem>
              </TextField>
              <p className={styles.helperText}>{errors.module ? errors.module.message : ''}</p>
            </div>
          </div>
          <div className={styles.buttonCreateContainer}>
            <Button size="large" sx={{ width: 230, height: 45 }} type="submit" variant="contained">
              {professionalParam ? 'Edit' : 'Create'}
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

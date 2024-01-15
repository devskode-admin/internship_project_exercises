/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProfessional } from '../../../redux/professionalSlice.js';
import styles from './form.module.css';
import { TextField, Button, MenuItem, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const FormModal = ({ handleCloseForm }) => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();

  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(createProfessional(data));
    if (response.error) {
      alert(response.error.message);
    } else {
      reset();
      handleCloseForm();
    }
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.wrapper}>
        <div className={styles.closeIcon}>
          <IconButton
            aria-label="cancel"
            onClick={() => {
              handleCloseForm();
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
                <MenuItem value="Area Manager">Manager</MenuItem>
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
  );
};

export default FormModal;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TextField, Button, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { Close, VisibilityOff, Visibility } from '@mui/icons-material';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import { createProfessional, getProfessionals } from '../../../redux/professionalSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const FormProfessional = ({ handleCloseForm }) => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);


  useEffect(() => {
    reset();
  }, []);

  const onSubmit = async (data) => {
    const response = await dispatch(createProfessional(data));
    if (!response.error) {
      reset();
      handleCloseForm();
      dispatch(getProfessionals());
    } else {
      alert(response.error.message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.wrapper}>
        <IconButton
          sx={{ position: 'absolute', right: '3px', top: '3px' }}
          aria-label="cancel"
          onClick={() => {
            reset();
            handleCloseForm();
          }}
        >
          <Close />
        </IconButton>
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
          </div>
          <div className={styles.inputsContainer}>
            <div>
              <TextField fullWidth label="Email" name="email" {...register('email')} />
            </div>
            <div>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                onChange={handleShowPassword}
                label="Password"
                name="password"
                {...register('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className={styles.inputsContainer}>
            <div>
              <TextField fullWidth select label="Role" name="role" {...register('role')}>
                <MenuItem value="Director">Director</MenuItem>
                <MenuItem value="Area Manager">Area Manager</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField fullWidth select label="Module" name="module" {...register('module')}>
                <MenuItem value="Human Resources">Human Resources</MenuItem>
                <MenuItem value="Full Stack Course">Full Stack Course</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
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

export default FormProfessional;

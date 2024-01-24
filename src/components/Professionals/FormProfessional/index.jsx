/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfessional, getProfessionals } from '../../../redux/professionalSlice';
import styles from './index.module.css';
import PropTypes from 'prop-types';
import {
  TextField,
  Button,
  MenuItem,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

const FormModal = ({ handleCloseForm }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { register, reset, handleSubmit } = useForm();

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

  return (
    <div className={styles.modalContainer}>
      <div className={styles.wrapper}>
        <IconButton
          sx={{ position: 'absolute', right: '3px', top: '3px' }}
          aria-label="cancel"
          onClick={() => {
            handleCloseForm();
            reset();
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
            <div>
              <TextField fullWidth label="Email" name="email" {...register('email')} />
            </div>
            <div>
              <FormControl variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{ width: 330 }}
                  label="Password"
                  name="password"
                  {...register('password')}
                />
              </FormControl>
            </div>
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

FormModal.propTypes = {
    handleCloseForm: PropTypes.func.isRequired,
}

export default FormModal;

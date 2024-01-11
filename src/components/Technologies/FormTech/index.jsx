/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTechnology, getTechnologies } from '../../../redux/technologySlice';
import styles from './index.module.css';
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
    const response = await dispatch(createTechnology(data));
    if (!response.error) {
      reset();
      handleCloseForm();
      dispatch(getTechnologies());
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
  );
};

export default FormModal;

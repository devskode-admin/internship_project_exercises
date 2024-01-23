/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTechnology, editTechnology } from '../../../redux/technologySlice';
import styles from './form.module.css';
import { TextField, Button, MenuItem, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import technologySchema from '../../../validations/technologies.js';
import { joiResolver } from '@hookform/resolvers/joi';

const FormModal = ({ handleCloseForm, technologyParam }) => {
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
  }, [technologyParam]);

  const onSubmit = async (data) => {
    if (technologyParam) {
      const payload = {
        _id: technologyParam.id,
        body: data,
      };
      const response = await dispatch(editTechnology(payload));
      if (response.error) {
        alert(response.error.message);
      } else {
        reset();
        handleCloseForm();
      }
    } else {
      const response = await dispatch(createTechnology(data));
      if (response.error) {
        alert(response.error.message);
      } else {
        reset();
        handleCloseForm();
      }
    }
  };

  return (
    <div className={styles.modalContainer}>
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
  );
};

export default FormModal;

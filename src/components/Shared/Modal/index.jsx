/* eslint-disable react/prop-types */
import styles from './index.module.css';
import { Button } from '@mui/material';

const Modal = ({ isOpen, close, actionDelete }) => {
  return isOpen ? (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <img src="/images/circle.png" className={styles.mainIcon} />
        <p>Are you sure you want to delete it?</p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={actionDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;

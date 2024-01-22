/* eslint-disable react/prop-types */
import styles from './index.module.css';
import { Button } from '@mui/material';

const Modal = ({ close, action, isDelete, text, img}) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <img
          src={img ? img : isDelete ? '/images/circle.png' : '/images/confirmation-image.png'}
          className={styles.mainIcon}
        />
        <p>{text}</p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button variant="contained" color={isDelete ? 'error' : 'primary'} onClick={action}>
            {isDelete ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import styles from './index.module.css';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Modal = ({ typeModal = '', action = () => {}, close = () => {} }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        {typeModal === 'delete' ? (
          <img src="/images/circle.png" className={styles.mainIcon} />
        ) : (
          <img src="/images/check.png" className={styles.mainIcon} />
        )}
        <p>
          {typeModal === 'delete'
            ? 'Are you sure you want to delete an item?'
            : 'Are you sure you want to confirm'}
        </p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          {typeModal === 'delete' ? (
            <Button variant="contained" color="error" onClick={action}>
              Delete
            </Button>
          ) : (
            <Button variant="contained" onClick={action}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  typeModal: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};

export default Modal;

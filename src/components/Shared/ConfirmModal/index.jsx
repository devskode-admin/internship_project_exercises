/* eslint-disable react/prop-types */
import styles from './index.module.css';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const ConfirmModal = ({
  type = 'Confirm',
  message = '',
  imageUrl = '',
  action = '',
  close = '',
}) => {
  if (!message) {
    switch (type) {
      case 'Delete':
        message = 'Are you sure you want to delete an item?';
        break;
      case 'Confirm':
        message = 'Are you sure you want to confirm?';
        break;
      default:
        message = 'Are you sure?';
    }
  }

  if (!imageUrl) {
    switch (type) {
      case 'Delete':
        imageUrl = '/images/circle.png';
        break;
      case 'Confirm':
        imageUrl = '/images/confirm.png';
        break;
      default:
        imageUrl = '/images/confirm.png';
    }
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <img src={imageUrl} className={styles.mainIcon} />
        <p>{message}</p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={type === 'Delete' ? 'error' : 'primary'}
            onClick={action}
          >
            {type}
          </Button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  imageUrl: PropTypes.string,
  action: PropTypes.func,
  close: PropTypes.func,
};

export default ConfirmModal;

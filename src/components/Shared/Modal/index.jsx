import PropTypes from 'prop-types';
import styles from './index.module.css';
import { Button } from '@mui/material';

const Modal = ({ close, action, isDeleteModal, text, img }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <img
          src={img ? img : isDeleteModal ? '/images/circle.png' : '/images/confirm-icon.png'}
          className={styles.mainIcon}
        />
        <p>{text}</p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button variant="contained" color={isDeleteModal ? 'error' : 'primary'} onClick={action}>
            {isDeleteModal ? 'Delete' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  close: PropTypes.func,
  action: PropTypes.func,
  isDeleteModal: PropTypes.bool,
  text: PropTypes.string,
  img: PropTypes.string,
};

export default Modal;

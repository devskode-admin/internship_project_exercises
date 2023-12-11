/* eslint-disable react/prop-types */
import styles from "./index.module.css";
import { Button } from "@mui/material";

const Modal = ({ text, image, isDelete, isOpen, close, id, action }) => {
  return isOpen ? (
    <div className={styles.modalContainer}>
      <div className={styles.container}>
        <img src={image} className={styles.mainIcon} />
        <p>{text}</p>
        <div className={styles.buttonsContainer}>
          <Button variant="outlined" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={isDelete ? "error" : "primary"}
            onClick={() => action(id)}
          >
            {isDelete ? "Delete" : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;

import IconButton from "./icon-button";
import styles from "./delete-button.module.scss";

const DeleteButton = ({ onClick }) => {
  return (
    <IconButton
      className={styles.btn}
      iconClassName={styles.icon}
      onClick={onClick}
    />
  );
};

export default DeleteButton;

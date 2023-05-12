import { Modal } from "antd";
import { CustomButton } from "@components/common/buttons";
import styles from "./styles.module.scss";

const ConfirmDelete = ({
  visible,
  onVisible = () => {},
  onSuccess = () => {},
  title,
  message,
  deleteLabel = "削除"
}) => {
  const onSubmit = () => {
    onSuccess();
    onVisible();
  };

  return (
    <>
      <Modal
        className={styles.modal}
        visible={visible}
        onOk={onSubmit}
        onCancel={onVisible}
        footer={null}
      >
        <div className={styles.modalBody}>
          <div className={styles.modalTitle}>{title}</div>
          <div className={styles.modalMessage}>
            {message}
            <br />
            よろしいですか？
          </div>
          <div className={styles.actions}>
            <CustomButton
              type="primary"
              className={styles.btnSubmit}
              variant="community"
              onClick={onSubmit}
            >
              {deleteLabel}
            </CustomButton>
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={onVisible}
            >
              キャンセル
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmDelete;

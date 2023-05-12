import { Modal } from "antd";
import { CustomButton } from "@components/common/buttons";
import styles from "./styles.module.scss";

const DeleteSpotMessageModal = ({ visible, onVisible = () => {} }) => {
  return (
    <>
      <Modal
        className={styles.modal}
        visible={visible}
        onCancel={onVisible}
        footer={null}
      >
        <div className={styles.modalBody}>
          <div className={styles.modalTitle}>
            エラ
            <br />
            次に進むことができません
          </div>
          <div className={styles.modalMessage}>
            少なくとも 3 つのスポットが必要です。
          </div>
          <div className={styles.actions}>
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={onVisible}
            >
              閉じる
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteSpotMessageModal;

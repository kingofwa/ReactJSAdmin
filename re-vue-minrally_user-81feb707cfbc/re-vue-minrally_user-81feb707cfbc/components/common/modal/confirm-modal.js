import { Button, Modal } from "antd";
import styles from "./confirm-modal.module.scss";

const ConfirmModal = ({ visible, message, onCancel, children, CancelBtn = true, title = null }) => {
  return (
    <Modal
      title={title}
      visible={visible}
      closable={false}
      footer={null}
      width={600}
    >
      <p className={styles.desc}>{message}</p>
      {children}
      <div className="text-center">
      {CancelBtn && <Button type="link" className={styles.cancelBtn} onClick={onCancel}>
          キャンセル
        </Button>}
      </div>
    </Modal>
  );
};

export default ConfirmModal;

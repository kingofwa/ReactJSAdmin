/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { Modal, Row } from "antd";
import styles from "./styles.module.scss";

const TooltipModal = ({ visible, hideModal, children }) => {
  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.tooltipModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.content}>{children}</Row>
      </Modal>
    </div>
  );
};

export default TooltipModal;

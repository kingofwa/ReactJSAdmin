import { Modal } from "antd";
import React from "react";
import styles from "./styles.module.scss";

const CertificateModal = ({ visible, closeModal, children }) => {
  return (
    <Modal
      title="賞状の編集"
      visible={visible}
      onOk={closeModal}
      onCancel={closeModal}
      className={styles.modalContainer}
      width="100%"
      closeIcon={
        <img
          src="/icons/ic-xmark-gray.png"
          alt="ic-xmark"
          className={styles.icClose}
        />
      }
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default CertificateModal;

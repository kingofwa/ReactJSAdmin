import { Modal } from "antd";
import React from "react";
import RallyContainer from "./components/RallyContainer";
import styles from "./styles.module.scss";

const PreviewModal = ({ visible, closePreview, preview }) => {
  return (
    <div>
      <Modal
        title="プレビュー中"
        visible={visible}
        onOk={closePreview}
        onCancel={closePreview}
        className={styles.preview}
        width="100%"
        closeIcon={
          <img
            src="/icons/ic-xmark.png"
            alt="ic-xmark"
            className={styles.icClose}
          />
        }
        footer={null}
      >
        <RallyContainer game={preview} />
      </Modal>
    </div>
  );
};

export default PreviewModal;

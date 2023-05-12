import { useState } from "react";
import { Button, Modal } from "antd";
import styles from "./info-modal.module.scss";

const InfoModal = ({ title, content }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <div className={styles.wrapper}>
      <Button type="link" className={styles.btn} onClick={showModal}>
        {title}
      </Button>
      <Modal
        title={title}
        visible={visible}
        closable={false}
        okText="閉じる"
        okType="link"
        onOk={hideModal}
        cancelButtonProps={{ className: "d-none" }}
        width={600}
      >
        {content}
      </Modal>
    </div>
  );
};

export default InfoModal;

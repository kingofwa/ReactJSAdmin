import { useState } from "react";
import { Button, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import styles from "./hint-button.module.scss";

const HintButton = ({ hintText }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    if (hintText) {
      setVisible(true);
    }
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        shape="circle"
        icon={<QuestionCircleOutlined className={styles.icon} />}
        className={styles.btn}
        onClick={showModal}
      />
      <Modal
        title={null}
        visible={visible}
        closable={false}
        okText="閉じる"
        okType="link"
        okButtonProps={{ className: styles.btnOk }}
        onOk={hideModal}
        cancelButtonProps={{ className: "d-none" }}
        width={600}
      >
        {hintText}
      </Modal>
    </>
  );
};

export default HintButton;

/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Modal, Row } from "antd";
import styles from "./styles.module.scss";

// screen: rally_tab2-6チェックインできない_sp

const ErrorLoginModal = ({ visible, hideModal, goToLogin }) => {
  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.errorLoginModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}> エラー</Row>
        <Row className={styles.status}>チェックインできませんでした。</Row>

        <Row className={styles.description}>
          チェックインにはログインが必要です。
        </Row>

        <Row justify="center">
          <CustomButton
            size="middle"
            variant="submit"
            className={styles.btnSubmit}
            onClick={goToLogin}
          >
            新規登録・ログイン
          </CustomButton>
        </Row>
      </Modal>
    </div>
  );
};

export default ErrorLoginModal;

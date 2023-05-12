/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Modal, Row } from "antd";
import styles from "./styles.module.scss";

// screen: rally_tab2-6チェックインできない_sp

const CheckinOneTimeModal = ({ visible, hideModal }) => {
  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.checkinOneTimeModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}>
          スポットへのチェックインは1日1回です。
        </Row>
        {/* <Row className={styles.status}>チェックインできませんでした。</Row> */}

        <Row className={styles.description}>
          本日はすでにチェックインしているため、チェックインすることができませんでした。
          <br />
          明日以降に再度チェックインしてください。
        </Row>

        <Row justify="center">
          <CustomButton
            size="middle"
            variant="primary"
            className={styles.btnSubmit}
            onClick={hideModal}
          >
            閉じる
          </CustomButton>
        </Row>
      </Modal>
    </div>
  );
};

export default CheckinOneTimeModal;

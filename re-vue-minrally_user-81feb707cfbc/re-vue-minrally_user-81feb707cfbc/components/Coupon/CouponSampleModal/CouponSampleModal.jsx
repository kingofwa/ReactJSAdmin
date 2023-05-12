import { Button, Modal, Row } from "antd";
import styles from "./styles.module.scss";

const CouponSampleModal = ({ visible, onClose = () => {} }) => {
  return (
    <Modal
      title="チェックイン報酬詳細"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      className={styles.CouponSampleModal}
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
      <Row className={styles.title} justify="center">
        チェックイン報酬詳細
      </Row>

      <div className={styles.ModalBody}>
        <div className={styles.CouponSample}>SAMPLE</div>

        <div className={styles.CouponContent}>
          <div className={styles.CouponTile}>
            チェックインスポットで使える10%クーポン
          </div>
          <div>
            発行回数：1ユーザーあたり1回
            <br />
            利用回数：1枚あたり1回
            <br />
            利用期限：2023.05.05
          </div>
        </div>

        <Row>
          <Button className={styles.btnSubmitModal} onClick={onClose}>
            閉じる
          </Button>
        </Row>
      </div>
    </Modal>
  );
};

export default CouponSampleModal;

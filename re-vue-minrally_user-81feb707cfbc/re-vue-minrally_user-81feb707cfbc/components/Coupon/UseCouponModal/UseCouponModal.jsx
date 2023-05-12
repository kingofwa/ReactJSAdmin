import { Button, Modal, Row } from "antd";
import styles from "./styles.module.scss";

const UseCouponModal = ({
  visible,
  onClose = () => {},
  onUseCoupon = () => {},
  data
}) => {
  const onApplyCoupon = () => {
    onUseCoupon();
    onClose();
  };
  return (
    <Modal
      title="チェックイン報酬詳細"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
      className={styles.UseCouponModal}
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
        確認
      </Row>

      <div className={styles.ModalBody}>
        <div className={styles.couponName}>
          {data?.name}
          <br />
          {/* 〇〇で使える10%クーポン <br /> */}
          を利用してよろしいですか？
        </div>

        <div className={styles.actions}>
          <Button className={styles.btnSubmit} onClick={onApplyCoupon}>
            利用する
          </Button>
          <Button className={styles.btnClose} onClick={onClose}>
            キャンセル
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UseCouponModal;

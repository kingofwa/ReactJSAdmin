import { Modal } from "antd";
import { CustomButton } from "@components/common/buttons";
import styles from "./styles.module.scss";

const SpotMessageModal = ({
  visible,
  onVisible = () => {},
  onSuccess = () => {}
}) => {
  const onSubmit = () => {
    onSuccess();
    onVisible();
  };

  return (
    <>
      <Modal
        className={styles.modal}
        visible={visible}
        onOk={onSubmit}
        onCancel={onVisible}
        footer={null}
      >
        <div className={styles.modalBody}>
          <div className={styles.modalTitle}>
            エラー
            <br />
            次に進むことができません
          </div>
          <div className={styles.modalMessage}>
            スポットは最低3箇所の登録が必要です。
            <br />
            下書き状態のスポットがあると次に進むことができません。
          </div>
          <div className={styles.actions}>
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={onVisible}
            >
              閉じる
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SpotMessageModal;

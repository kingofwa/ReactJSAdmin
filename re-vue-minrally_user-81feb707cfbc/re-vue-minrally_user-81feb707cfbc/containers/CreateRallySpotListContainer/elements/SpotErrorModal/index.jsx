import { Modal } from "antd";
import { CustomButton } from "@components/common/buttons";
import styles from "./styles.module.scss";

const SpotErrorModal = ({
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
            このラリーには参加者がいるため、
            <br />
            スポットの編集はできません。
          </div>
          <div className={styles.modalMessage}>
            スポット情報の変更、追加、削除を行うには、
            <br />
            ラリーのバージョンアップが必要です。
          </div>
          <div className={styles.actions}>
            <CustomButton
              type="primary"
              className={styles.btnSaveDraft}
              variant="community"
              onClick={onVisible}
            >
              バージョンアップ
            </CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SpotErrorModal;

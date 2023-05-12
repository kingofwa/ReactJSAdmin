import { Modal } from "antd";
import styles from "./styles.module.scss";

const ErrorPublicMessageModal = ({ visible, onVisible = () => {} }) => {
  return (
    <>
      <Modal
        className={styles.modal}
        visible={visible}
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
            スポット情報の変更、追加、削除を行うためのバージョンアップ機能を現在開発中です。
            <br />
            ご不便をおかけしますが、機能公開まで今しばらくお待ち下さい。
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ErrorPublicMessageModal;

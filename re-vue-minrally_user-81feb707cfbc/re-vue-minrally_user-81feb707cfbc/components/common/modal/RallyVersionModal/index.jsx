/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Divider, Modal, Row } from "antd";
import styles from "./styles.module.scss";

const RallyVersionModal = ({ visible, hideModal }) => {
  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.versionModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}> バージョンアップ確認</Row>

        <Row className={styles.description}>
          ラリーのバージョンをアップします。
          <br />
          よろしいですか？
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.helpText}>
          ユーザーの混乱を招くため、 <br />
          むやみにバージョンアップすることはお控えください。
          <br /> <br />
          バージョンアップ前からの参加者においては、 <br />
          以前のバージョンも引き続きお楽しみいただけます。
          <br /> <br />
          バージョンアップ後の参加者においては、
          <br />
          新しいバージョンでの参加となります。
        </Row>
        <div className={styles.actions}>
          <CustomButton
            type="primary"
            className={styles.btnSubmit}
            variant="community"
            onClick={hideModal}
          >
            バージョンアップ
          </CustomButton>
          <CustomButton
            type="primary"
            className={styles.btnSaveDraft}
            variant="community"
            onClick={hideModal}
          >
            キャンセル
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default RallyVersionModal;

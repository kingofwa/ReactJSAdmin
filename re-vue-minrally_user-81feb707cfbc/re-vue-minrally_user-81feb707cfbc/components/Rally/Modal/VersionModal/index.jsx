/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Divider, Modal, Row } from "antd";
import styles from "./styles.module.scss";

const VersionModal = ({ visible, hideModal }) => {
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
        <Row className={styles.date}> 2022.07.07</Row>
        <Row className={styles.title}> バージョン3.0が公開されました。</Row>

        <Row className={styles.description}>
          以前のバージョンからの更新内容は下記のとおりです。
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.helpText}>
          ・スポット数が5から7へ変更されました。
          <br />
          ・スポット「AAAA」を削除しました。
          <br />
          ・スポット「BBBB」を追加しました。
          <br />
          ・スポット「FFFF」を追加しました。
          <br />
          ・スポット「GGGG」を追加しました。
          <br />
          ・スポット「HHHH」を追加しました。
          <br />
          ・スポット「CCCC」の位置情報を変更しました。
          <br />
          ・スポット「DDDD」のスポット名を変更しました。
          <br />
          ・スポット「EEEE」の説明文を更新しました。
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

export default VersionModal;

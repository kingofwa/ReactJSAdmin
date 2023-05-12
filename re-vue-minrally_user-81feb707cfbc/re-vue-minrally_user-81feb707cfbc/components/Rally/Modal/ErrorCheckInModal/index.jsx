/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Divider, Modal, Row } from "antd";
import React from "react";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import styles from "./styles.module.scss";

// screen: rally_tab2-6チェックインできない_sp

const ErrorCheckInModal = ({ visible, hideModal }) => {
  const route = useRouter();

  const onGoContact = () => {
    hideModal();
    route.push(PATHS.contact);
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.errorCheckInModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}> エラー</Row>
        <Row className={styles.status}>チェックインできませんでした。</Row>

        <Row className={styles.description}>
          スポットの範囲や位置情報がONに
          <br />
          なっていることを確認し、
          <br />
          再度チェックインしてください。
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.helpText}>
          スポットの範囲と位置情報をONにしたうえで
          <br />
          何度も失敗してしまう場合は下記より
          <br />
          チェックイン報告のご連絡をお願いします。
        </Row>
        <Row justify="center">
          <CustomButton
            size="middle"
            variant="primary"
            className={styles.btnSubmit}
            onClick={onGoContact}
          >
            お問い合わせ
          </CustomButton>
        </Row>
      </Modal>
    </div>
  );
};

export default ErrorCheckInModal;

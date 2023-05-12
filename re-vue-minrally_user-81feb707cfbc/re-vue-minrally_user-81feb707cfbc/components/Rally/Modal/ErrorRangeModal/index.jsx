/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Modal, Row } from "antd";
import React from "react";
import styles from "./styles.module.scss";

const ErrorRangeModal = ({ visible, hideModal, isSpotDetail }) => {
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
          {isSpotDetail
            ? "チェックイン範囲外です。"
            : "現在地から チェックインできるスポットはありません。"}
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

export default ErrorRangeModal;

import React from "react";
import { QrReader } from "react-qr-reader";
import { CloseOutlined } from "@ant-design/icons";
// import { message } from "antd";
import styles from "./styles.module.scss";

const ScannerQrCodeModal = ({ visible, onClose }) => {
  const close = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <div className={styles.QrScanner}>
      <div className={styles.Title}>
        QRコードを読み込む
        <div className={styles.CloseBtn} onClick={close}>
          <CloseOutlined style={{ color: "#DADADA", fontSize: "20px" }} />
        </div>
      </div>

      <div className={styles.Body}>
        <div className={styles.Frame}>
          <div className={styles.Corner} />
          <div className={styles.Corner} />
          <div className={styles.Corner} />
          <div className={styles.Corner} />
        </div>
        <QrReader
          key="environment"
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result?.text) {
              window.location.href = result?.text;
            } else if (error) {
              // message.error(error);
              //
            }
          }}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default ScannerQrCodeModal;

import { Button, Upload } from "antd";
import React from "react";
import styles from "./upload-button.module.scss";

const UploadBtn = ({
  children,
  className = "",
  variant = "default",
  btnProps,
  beforeUpload,
  ...rest
}) => {
  return (
    <Upload showUploadList={false} beforeUpload={beforeUpload} {...rest}>
      <Button
        className={`custom-button ${styles.btn} ${className} ${variant}`}
        {...btnProps}
      >
        {children}
      </Button>
    </Upload>
  );
};

export default UploadBtn;

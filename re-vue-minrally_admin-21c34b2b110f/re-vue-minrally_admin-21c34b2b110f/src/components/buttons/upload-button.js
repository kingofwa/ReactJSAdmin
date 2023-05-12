import { Button, Upload } from 'antd';
import React from 'react';
import './styles.scss';

const UploadButton = ({ children, className = '', btnProps, ...rest }) => {
  return (
    <Upload
      showUploadList={false}
      onPreview={false}
      listType="picture-card"
      accept="image/png, image/jpeg"
      {...rest}
    >
      <Button className={`upload-button ${className}`} {...btnProps}>
        {children}
      </Button>
    </Upload>
  );
};

export default UploadButton;

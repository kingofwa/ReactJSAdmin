import React from 'react';
import _ from 'lodash';
import { Upload, Button } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './ImageUpload.scss';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const ImageUpload = ({ fileList, onChange, maxSize, children, ...rest }) => {
  const triggerChange = async info => {
    if (onChange) {
      if (info) {
        info.fileList[0].thumbUrl = await getBase64(
          info.fileList[0].originFileObj
        );
        onChange(info.fileList);
      } else {
        onChange(info);
      }
    }
  };

  const handleBeforeUpload = file => false;

  const handleRemove = () => triggerChange(null);

  const uploadButton = (
    <>
      <PictureOutlined />
      <div className="ant-upload-text">アップロード</div>
    </>
  );

  const hasPhoto = _.size(fileList) > 0;

  return (
    <>
      <Upload
        listType="picture-card"
        accept="image/png, image/jpeg"
        showUploadList={{
          showPreviewIcon: false,
          showRemoveIcon: false,
          showDownloadIcon: false
        }}
        fileList={fileList || null}
        onChange={triggerChange}
        beforeUpload={handleBeforeUpload}
      >
        {!hasPhoto && uploadButton}
      </Upload>
      <div className="image-upload__body">
        <div className="image-upload__controls">
          <Button
            className="image-upload__btn-delete"
            disabled={!hasPhoto}
            onClick={handleRemove}
          >
            削除
          </Button>
          {children}
        </div>
      </div>
    </>
  );
};

export default ImageUpload;

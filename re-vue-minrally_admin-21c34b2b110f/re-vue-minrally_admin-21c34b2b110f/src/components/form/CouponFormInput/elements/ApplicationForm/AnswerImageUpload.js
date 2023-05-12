import React, { useState } from 'react';
import { findIndex, isEmpty } from 'lodash';
import { Form, message, Modal, Upload } from 'antd';
import AddPhoto from '@assets/icons/add_photo.png';
import { ERROR_MESSAGES } from '@config/messages';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import './styles.scss';

const AnswerImageUpload = ({
  required,
  showNote,
  fieldName,
  max = 7,
  photos,
  isCropped = false,
  onChangePhotos = () => {},
  ...rest
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [hasError, setHasError] = useState(false);

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const customRequest = async info => {
    if (!hasError && info) {
      const { file } = info;
      const image = { originFileObj: file };
      image.url = await getBase64(file);
      setFileList([image]);
    }
  };

  const beforeUpload = file => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isValidType) {
      message.error(
        '画像フォーマットが正しくありません。 .png/.jpg/.gif 形式の画像を選択してください。'
      );
    }
    const isValidSize = file.size / 1024 / 1024 <= 20;
    if (!isValidSize) {
      message.error('20MBまでで画像を選択してください。');
    }
    const isValid = isValidSize && isValidType;
    setHasError(!isValid);
    return isValid;
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleCancel = () => setPreviewOpen(false);

  const isRequired = required && isEmpty(fileList);

  const onRemove = file => {
    const newList = [...fileList];
    const index = findIndex(fileList, file);
    newList.splice(index, 1);
    setFileList(newList);
  };

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className={required ? 'upload-required' : 'upload-photos'}
        rules={[{ required: isRequired, message: ERROR_MESSAGES.empty }]}
        name={fieldName}
        getValueFromEvent={event => {
          return event?.fileList;
        }}
        {...rest}
      >
        <Upload
          accept="image/png, image/jpeg"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={beforeUpload}
          onPreview={handlePreview}
          onRemove={onRemove}
          // onChange={onChange}
          customRequest={customRequest}
        >
          {fileList.length < max && (
            <div className="add-photo">
              <img src={AddPhoto} alt="add_photo" />
            </div>
          )}
        </Upload>
      </Form.Item>

      <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default AnswerImageUpload;

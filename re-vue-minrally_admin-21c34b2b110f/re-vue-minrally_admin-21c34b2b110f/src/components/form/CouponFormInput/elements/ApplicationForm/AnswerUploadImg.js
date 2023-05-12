import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { findIndex, isEmpty } from 'lodash';
import { Form, message, Modal, Upload } from 'antd';
import AddPhoto from '@assets/icons/add_photo.png';
import { ERROR_MESSAGES } from '@config/messages';
import 'antd/es/modal/style';
import 'antd/es/slider/style';

import './styles.scss';

const AnswerUploadImg = ({
  form,
  required,
  showNote,
  name = 'top_photo',
  max = 7,
  photos,
  isCropped = false,
  onChangePhotos = () => {},
  ...rest
}) => {
  // const [errUpload, setErrUpload] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  const getBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  // const onChange = info => {
  //   if (!errUpload) {
  //     setFileList(info?.fileList);
  //   }
  // };

  const beforeUpload = async file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileList(prev => [
        ...prev,
        { url: reader.result, originFileObj: file }
      ]);
    };
    return false;
  };

  const beforeCrop = file => {
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
    // if (isValid) {
    //   setErrUpload(false);
    // } else {
    //   setErrUpload(true);
    // }
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

  console.log('form: ', form.getFieldsValue());

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className={required ? 'upload-required' : 'upload-photos'}
        rules={[{ required: isRequired, message: ERROR_MESSAGES.empty }]}
        name={name}
        {...rest}
      >
        {showNote && (
          <p className="photos-note">
            画像は中央で円型にトリミングされます。正方形の画像をご用意ください。
          </p>
        )}

        <ImgCrop
          rotationSlider
          showReset
          showGrid
          aspectSlider
          beforeCrop={beforeCrop}
          modalCancel="キャンセル"
          resetText="リセットする"
          modalOk="送信"
          modalTitle="画像を編集"
        >
          <Upload
            accept="image/png, image/jpeg"
            action={null}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={beforeUpload}
            onPreview={handlePreview}
            onRemove={onRemove}
          >
            {fileList.length < max && (
              <div className="add-photo">
                <img src={AddPhoto} alt="add_photo" />
              </div>
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>

      <Modal
        open={previewOpen}
        // title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
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

export default AnswerUploadImg;

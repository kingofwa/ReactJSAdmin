import React, { useEffect, useState } from 'react';
import { Form, message, Upload } from 'antd';
import UploadButton from '@components/buttons/upload-button';
import icClose from '@assets/icons/icon-delete.png';
import { get } from 'lodash';
import { ERROR_MESSAGES } from '@config/messages';
import './styles.scss';

const UploadPhotos = ({
  form,
  required,
  showNote = false,
  imageFile,
  name = 'top_photo',
  maxSize = 20,
  showDeleteIcon = true,
  ...rest
}) => {
  const [listImage, setListImage] = useState([]);
  const [errUpload, setErrUpload] = useState(false);

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      setListImage(fileList);
      const image = get(fileList, ['0', 'originFileObj']);
      form.setFieldsValue({
        [name]: image
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      setListImage([imageFile]);
    }
  }, [imageFile]);

  // const handleBeforeUpload = _file => false;

  // const beforeUpload = file => {
  //   const isValidSize = file.size / 1024 / 1024 <= maxSize;
  //   if (!isValidSize) {
  //     message.error(`${maxSize}MBまでで画像を選択してください。`);
  //     setErrUpload(true);
  //   } else {
  //     setErrUpload(false);
  //   }
  //   if (!isValidSize) {
  //     return isValidSize;
  //   } else return false;
  // };

  const beforeUpload = file => {
    const isValidType =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isValidType) {
      setErrUpload(true);
      message.error(
        '画像フォーマットが正しくありません。 .png/.jpg/.gif 形式の画像を選択してください。'
      );
    }
    const isValidSize = file.size / 1024 / 1024 <= 20;
    if (!isValidSize) {
      setErrUpload(true);
      message.error('20MBまでで画像を選択してください。');
    }
    if (!isValidType || !isValidSize) {
      setErrUpload(true);
    } else {
      setErrUpload(false);
    }
    return false;
  };

  const onDeletePhoto = file => {
    const index = listImage.indexOf(file);
    const newFileList = listImage.slice();
    newFileList.splice(index, 1);
    setListImage(newFileList);
    form.setFieldsValue({
      [name]: null
    });
  };

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className={required ? 'upload-photos-required' : 'upload-photos'}
        rules={[{ required, message: ERROR_MESSAGES.empty }]}
        name={name}
        {...rest}
      >
        {showNote && (
          <p className="photos-note">
            画像は中央で円型にトリミングされます。正方形の画像をご用意ください。
          </p>
        )}
        <div className="row">
          <UploadButton
            fileList={listImage}
            onChange={handleChange}
            showUploadList={false}
            listType="picture-card"
            onPreview={false}
            accept="image/png, image/jpeg, image/gif"
            variant="primary"
            beforeUpload={beforeUpload}
            maxCount={1}
          >
            ファイルを選択
          </UploadButton>
          {listImage?.length === 0 && <span>選択されていません</span>}
        </div>

        <Upload
          className="upload-img"
          listType="picture-card"
          fileList={listImage}
          onPreview={false}
          maxCount={1}
          accept="image/png, image/jpeg, image/gif"
          showUploadList={{
            removeIcon: image => {
              return (
                <>
                  {showDeleteIcon && (
                    <img
                      src={icClose}
                      alt="icons"
                      className="upload-close-icon"
                      onClick={() => onDeletePhoto(image)}
                    />
                  )}
                </>
              );
            },
            showPreviewIcon: false
          }}
        />
      </Form.Item>
    </>
  );
};

export default UploadPhotos;

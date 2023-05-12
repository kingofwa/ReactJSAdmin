import React, { useEffect, useState } from 'react';
import { Form, message, Upload } from 'antd';
import UploadButton from '@components/buttons/upload-button';
import icClose from '@assets/icons/icon-delete.png';
import { get, head } from 'lodash';
import { PHOTO } from '@config/constants';
import placeholderImg from '@assets/img/rally-placeholder-image.png';
import './styles.scss';

const UploadTopPhoto = ({
  form,
  required,
  showNote = false,
  topPhoto,
  googlePhoto,
  name = 'top_photo',
  isCreate,
  ...rest
}) => {
  const [errUpload, setErrUpload] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState();
  const [topImage, setTopImage] = useState();
  const [showPhoto, setShowPhoto] = useState([]);

  const defaultPhoto = { name: 'default', url: placeholderImg };

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      const file = head(fileList);
      setUploadPhoto(file);
      const image = get(fileList, ['0', 'originFileObj']);
      form.setFieldsValue({
        [name]: image
      });
    }
  };

  useEffect(() => {
    if (topPhoto) {
      setTopImage(topPhoto);
    }
  }, [topPhoto]);

  useEffect(() => {
    const showPhoto = isCreate
      ? uploadPhoto || null
      : uploadPhoto || topImage || googlePhoto || defaultPhoto;
    if (showPhoto) {
      setShowPhoto([showPhoto]);
    } else {
      setShowPhoto([]);
    }
    // eslint-disable-next-line
  }, [uploadPhoto, googlePhoto, topImage]);

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

  const onDeletePhoto = _file => {
    if (!uploadPhoto) {
      setTopImage(null);
      form.setFieldsValue({
        [name]: PHOTO.delete
      });
    } else {
      setUploadPhoto(null);
      form.setFieldsValue({
        [name]: null
      });
    }
  };

  const hasPhoto = uploadPhoto || topImage;

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className={required ? 'upload-photos-required' : 'upload-top-photos'}
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
            fileList={showPhoto}
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
          {showPhoto?.length === 0 && <span>選択されていません</span>}
        </div>

        <Upload
          className="upload-img"
          listType="picture-card"
          fileList={showPhoto}
          onPreview={false}
          maxCount={1}
          accept="image/png, image/jpeg, image/gif"
          showUploadList={{
            removeIcon: image => {
              return (
                <>
                  {hasPhoto && (
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

export default UploadTopPhoto;

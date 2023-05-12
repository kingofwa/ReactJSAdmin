import React, { useEffect, useState } from 'react';
import { Form, message, Upload } from 'antd';
import UploadButton from '@components/buttons/upload-button';
import icClose from '@assets/icons/icon-delete.png';
import { get, map } from 'lodash';
import './styles.scss';

const UploadImages = ({
  form,
  required,
  showNote = false,
  imageFile,
  name = 'photos',
  maxCount = 7,
  maxSize = 20,
  setImageFile = () => {},
  ...rest
}) => {
  const [listImage, setListImage] = useState([]);
  const [errUpload, setErrUpload] = useState(false);

  const handleChange = ({ fileList }) => {
    if (!errUpload) {
      setListImage(fileList);
      const images = map(fileList, file => get(file, ['originFileObj']));
      setImageFile(images);
      form.setFieldsValue({
        [name]: images
      });
    }
  };

  useEffect(() => {
    if (imageFile) {
      setListImage(imageFile);
    }
  }, [imageFile]);

  const onDeletePhoto = file => {
    const index = listImage.indexOf(file);
    const newFileList = listImage.slice();
    newFileList.splice(index, 1);
    setListImage(newFileList);
    const images = map(newFileList, file => get(file, ['originFileObj']));
    setImageFile(images);
    form.setFieldsValue({
      [name]: images
    });
  };

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
    const isValidSize = file.size / 1024 / 1024 <= maxSize;
    if (!isValidSize) {
      setErrUpload(true);
      message.error(`${maxSize}MBまでで画像を選択してください。`);
    }
    if (!isValidType || !isValidSize) {
      setErrUpload(true);
    } else {
      setErrUpload(false);
    }
    return false;
  };

  return (
    <>
      <Form.Item
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        className={required ? 'upload-photos-required' : 'upload-images'}
        rules={[{ required }]}
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
            accept="image/png, image/jpeg"
            variant="primary"
            beforeUpload={beforeUpload}
            maxCount={maxCount}
          >
            ファイルを選択
          </UploadButton>
          {/* {listImage?.length === 0 && <span>選択されていません</span>} */}
        </div>

        <Upload
          className="upload-img"
          listType="picture-card"
          fileList={listImage}
          onPreview={false}
          maxCount={maxCount}
          accept="image/png, image/jpeg, image/gif"
          showUploadList={{
            removeIcon: image => {
              return (
                <img
                  src={icClose}
                  alt="icons"
                  className="upload-close-icon"
                  onClick={() => onDeletePhoto(image)}
                />
              );
            },
            showPreviewIcon: false
          }}
        />
      </Form.Item>
    </>
  );
};

export default UploadImages;

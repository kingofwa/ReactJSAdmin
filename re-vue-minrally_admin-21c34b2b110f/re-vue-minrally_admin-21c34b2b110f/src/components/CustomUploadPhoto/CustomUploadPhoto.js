import React, { useEffect, useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { get, isArray, isEmpty, map } from 'lodash';
import { Form, message, Modal, Upload } from 'antd';
import AddPhoto from '@assets/icons/add_photo.png';
import { ERROR_MESSAGES } from '@config/messages';
import { srcToFile } from '@utils/image';
import './styles.scss';

const CustomUploadPhoto = ({
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
  const [errUpload, setErrUpload] = useState(false);
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

  const onChange = ({ fileList: newFileList }) => {
    if (!errUpload) {
      setFileList(newFileList);
      if (max === 1) {
        form.setFieldsValue({
          [name]: get(newFileList, ['0', 'originFileObj'])
        });
      } else {
        let images = map(newFileList, file => {
          return get(file, ['originFileObj']);
        });
        form.setFieldsValue({
          [name]: images
        });
      }
      onChangePhotos(newFileList);
    }
  };

  const initPhoto = async () => {
    let images = await srcToFile(photos);
    setFileList(images);
  };

  useEffect(() => {
    if (photos) {
      if (!isArray(photos)) {
        setFileList([{ url: photos }]);
      } else if (!isEmpty(photos)) {
        initPhoto();
        let images = map(photos, (photo, idx) => {
          return { url: photo, name: idx };
        });
        form.setFieldsValue({
          [name]: images
        });
        setFileList(images);
      }
    }
    // eslint-disable-next-line
  }, [photos]);

  const handleBeforeUpload = _file => false;

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
    if (isValid) {
      setErrUpload(false);
    } else {
      setErrUpload(true);
    }
    if (!isCropped) {
      return false;
    }
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

        <ImgCrop beforeCrop={beforeUpload}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            beforeUpload={handleBeforeUpload}
            onPreview={handlePreview}
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

export default CustomUploadPhoto;

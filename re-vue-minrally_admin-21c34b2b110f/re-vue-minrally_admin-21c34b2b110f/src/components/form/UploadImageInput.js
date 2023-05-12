import React from 'react';
import PropTypes from 'prop-types';
import { Form, Divider } from 'antd';
import { ERROR_MESSAGES } from '@config/messages';
import ImageUpload from './ImageUpload';
import './UploadImageInput.scss';

const UploadImageInput = ({
  maxSize,
  required,
  divider,
  children,
  haveSub,
  extra,
  extraNote,
  extraClass,
  ...rest
}) => {
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const isValid = file => {
    const isImage = file.type.match(/image\/(jpeg|png)/);
    const isValidSize = file.size / 1024 / 1024 < maxSize;

    return isImage && isValidSize;
  };

  const defaultExtra = () => {
    return (
      <div className="image-upload__note">
        {haveSub && (
          <div>
            <div>※画像は５枚まで追加できます。</div>
            <div>※１枚目の画像がメイン画像として表示されます。</div>
          </div>
        )}
        {extraNote && <div dangerouslySetInnerHTML={{ __html: extraNote }} />}
        <div>※{maxSize}MB以内の画像ファイルをご用意下さい。</div>
        <div>※対応ファイル：jpg、 png。</div>
      </div>
    );
  };

  return (
    <>
      <Form.Item
        {...rest}
        valuePropName="fileList"
        rules={[
          { required, message: ERROR_MESSAGES.empty },
          {
            validator: (_, value) => {
              if (!value || value[0].uid === '-1' || isValid(value[0])) {
                return Promise.resolve();
              }

              return Promise.reject(
                `${maxSize}MB以下のJPG、もしくはPNG画像をアップロードして下さい`
              );
            }
          }
        ]}
        getValueFromEvent={normFile}
        className={`image-upload align-items-center ${extraClass}`}
        extra={extra || defaultExtra()}
      >
        <ImageUpload maxSize={maxSize}>{children}</ImageUpload>
      </Form.Item>
      {divider && <Divider />}
    </>
  );
};

UploadImageInput.propTypes = {
  required: PropTypes.bool.isRequired,
  maxSize: PropTypes.number.isRequired,
  divider: PropTypes.bool.isRequired,
  haveSub: PropTypes.bool.isRequired
};

UploadImageInput.defaultProps = {
  required: false,
  maxSize: 5,
  divider: false,
  haveSub: true,
  extraClass: ''
};

export default UploadImageInput;

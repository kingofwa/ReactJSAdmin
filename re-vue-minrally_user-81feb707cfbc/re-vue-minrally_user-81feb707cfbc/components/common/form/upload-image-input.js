import { Form } from "antd";
import ImageUpload from "./image-upload";

const UploadImageInput = ({ maxSize = 5, previewProps = {}, ...rest }) => {
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
  return (
    <Form.Item
      {...rest}
      valuePropName="fileList"
      rules={[
        {
          validator: (_, value) => {
            if (!value || value[0].uid === "-1" || isValid(value[0])) {
              return Promise.resolve();
            }

            return Promise.reject(
              new Error(
                `${maxSize}MB以下のJPG、もしくはPNG画像をアップロードして下さい`
              )
            );
          }
        }
      ]}
      getValueFromEvent={normFile}
    >
      <ImageUpload {...previewProps} />
    </Form.Item>
  );
};

export default UploadImageInput;

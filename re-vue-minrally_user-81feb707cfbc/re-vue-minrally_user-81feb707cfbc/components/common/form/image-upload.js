import { Button, Upload } from "antd";
import ImagePreview from "@components/common/image-preview";
import styles from "./image-upload.module.scss";

const ImageUpload = ({ fileList, onChange, ...rest }) => {
  const triggerChange = info => {
    if (onChange) {
      onChange(info && info.fileList);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleBeforeUpload = _file => false;

  return (
    <>
      <ImagePreview file={fileList && fileList[0]} {...rest} />
      <Upload
        accept="image/png, image/jpeg, image/gif"
        maxCount={1}
        fileList={fileList}
        showUploadList={false}
        onChange={triggerChange}
        beforeUpload={handleBeforeUpload}
      >
        <Button type="primary" className={styles.btn}>
          画像アップロード
        </Button>
      </Upload>
    </>
  );
};

export default ImageUpload;

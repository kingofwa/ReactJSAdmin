import { createRef, useEffect } from "react";
import { message } from "antd";
import { getBase64 } from "@utils/image";
import styles from "./index.module.scss";

const ImagePreview = ({
  file,
  placeholder = "/missing.png",
  className = styles.wrapper
}) => {
  const img = createRef();

  useEffect(() => {
    if (file) {
      if (file.url) {
        img.current.src = file.url;
      } else {
        getBase64(file.originFileObj)
          .then(result => {
            img.current.src = result;
          })
          .catch(error => message.error(error));
      }
    }
  }, [file]);

  return (
    <div className={className}>
      <img className={styles.img} src={placeholder} alt="" ref={img} />
    </div>
  );
};

export default ImagePreview;

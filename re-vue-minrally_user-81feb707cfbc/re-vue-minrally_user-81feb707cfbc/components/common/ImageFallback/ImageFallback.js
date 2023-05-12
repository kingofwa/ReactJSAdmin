import ReactImageFallback from "react-image-fallback";
import { Skeleton } from "antd";
import { isEmpty } from "lodash";

const fallbackImgUrl = "/img/rally-placeholder-image.png";

const ImageFallback = ({
  src,
  fallbackImage = fallbackImgUrl,
  alt = "img-fallback",
  isLoading
}) => {
  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <ReactImageFallback
      src={!isEmpty(src) ? src : null}
      fallbackImage={fallbackImage}
      alt={alt}
    />
  );
};

export default ImageFallback;

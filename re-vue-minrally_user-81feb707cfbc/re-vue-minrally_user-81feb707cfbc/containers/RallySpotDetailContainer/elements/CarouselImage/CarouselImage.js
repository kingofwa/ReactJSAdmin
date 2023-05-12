import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { size } from "lodash";
import { Skeleton } from "antd";
import styles from "./CarouselImage.module.scss";

const CarouselImage = ({ photos, isLoading }) => {
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const onShowLightBox = index => {
    setPhotoIndex(index);
    setIsOpenLightBox(true);
  };

  const placeholderImg = "/img/rally-placeholder-image.png";

  const displayCount = 1;
  const [currentIndex, setSlide] = useState(0);

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      <div className={styles.carouselImage}>
        {photos && photos?.length > 0 ? (
          <>
            <div
              className={styles.Pre}
              onClick={() =>
                setSlide((currentIndex - 1 + size(photos)) % size(photos))
              }
            />
            <Carousel
              showIndicators={false}
              showArrows={false}
              centerMode
              centerSlidePercentage={100 / displayCount}
              selectedItem={currentIndex}
            >
              {photos.map((url, index) => (
                <div
                  className={styles.imgWrapper}
                  key={url + Math.random()}
                  onClick={() => onShowLightBox(index)}
                >
                  <img src={url || placeholderImg} alt="img" />
                </div>
              ))}
            </Carousel>

            <div
              onClick={() => setSlide((currentIndex + 1) % size(photos))}
              className={styles.Back}
            />
          </>
        ) : (
          <Carousel>
            <div className={styles.imgWrapper}>
              <img src={placeholderImg} alt="img" />
            </div>
          </Carousel>
        )}
        {photos && photos?.length === 0 && <p className={styles.noImage} />}

        {isOpenLightBox && size(photos) > 0 && (
          <Lightbox
            mainSrc={photos[photoIndex] || placeholderImg}
            nextSrc={photos[(photoIndex + 1) % photos.length]}
            prevSrc={photos[(photoIndex + photos.length - 1) % photos.length]}
            onCloseRequest={() => setIsOpenLightBox(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + photos?.length - 1) % photos.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % photos.length)
            }
          />
        )}
      </div>
    </>
  );
};

export default CarouselImage;

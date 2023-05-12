import { map, size } from "lodash";
import React from "react";
import Flickity from "react-flickity-component";

import Styles from "./style.module.scss";



const Slider = ({ data }) => {
  const slider = React.useRef(null);
  const flickityOptions = {
    initialIndex: 0,
    autoPlay: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: false,
    on: {
      pointerUp: () => {
        slider?.current?.player?.play()
      }
    }
  };

  if (size(data) > 0) {
    return (
      <Flickity
        flickityRef={
          (r) => {
            slider.current = r;
            return slider.current
          }
        }
        className={Styles.carousel}
        elementType="div"
        options={flickityOptions}
        disableImagesLoaded={false}
        reloadOnUpdate
        static
      >
        {map(data, (slide, index) => {
          const key = slide.id + index;
          return (
            <a
              href={slide?.url ? slide?.url : "#"}
              target={slide?.url ? "_blank" : "_self"}
              className={slide?.url ? Styles.wrapper : Styles.wrapperNonURl}
              rel="noreferrer"
            >
              <figure className="sixteen-nine-img">
                <img
                  key={key}
                  className={Styles.carouselCell}
                  src={slide?.image_url}
                  alt="slider"
                />
              </figure>
            </a>
          );
        })}
      </Flickity>
    );
  }

  return null;
};

export default Slider;

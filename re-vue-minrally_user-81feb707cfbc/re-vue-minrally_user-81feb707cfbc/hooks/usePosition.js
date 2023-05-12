/* eslint-disable no-use-before-define */
import { ERROR_MESSAGES } from "@config/messages";
// import { LoaderContext } from "@contexts/loader";
import { message } from "antd";
import { useEffect, useState } from "react";

const usePosition = () => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locationLoading, setLocationLoading] = useState(false);
  // const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const onBlockGetLocation = () => {
    message.error(ERROR_MESSAGES.blockLocation);
    // hideLoadingAnim();
    setLocationLoading(false);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const getPosition = pos => {
    const getLat = pos?.coords?.latitude;
    const getLng = pos?.coords?.longitude;
    if (getLat && getLng) {
      setLat(pos?.coords?.latitude);
      setLng(pos?.coords?.longitude);
    } else {
      goToRallyResultWithGps();
    }
    // hideLoadingAnim();
    setLocationLoading(false);
  };

  const goToRallyResultWithGps = () => {
    if (navigator.geolocation) {
      // showLoadingAnim();
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        getPosition,
        onBlockGetLocation,
        options
      );
    } else {
      message.error(ERROR_MESSAGES.browserNotSupported);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    goToRallyResultWithGps();
    // }, 500);
  }, []);

  return { lat, lng, locationLoading };
};

export default usePosition;

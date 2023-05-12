import Slider from "@components/TopPage/Slider";
import styles from "@components/TopPage/style.module.scss";
import { LoaderContext } from "@contexts/loader";
import getSlider from "@services/slider";
import { STATUS_CREATOR } from "@utils/constants";
import { ROLE, storeRole } from "@utils/storage/user";
import { message } from "antd";
import { size } from "lodash";
import { useCallback, useContext, useEffect, useState } from "react";
import { getApplication } from "../service";
import CreatorInformation from "./CreatorInformation";
import CreatorBeforeRegis from "./Registration/CreatorBeforeRegis";
import RegistrationWaitConfirm from "./Registration/RegistrationWaitConfirm";

const CreatorMypage = () => {
  const [statusCreator, setStatusCreator] = useState("");
  const [banners, setBanners] = useState([]);

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchCreatorApp = useCallback(() => {
    showLoadingAnim();
    getApplication()
      .then(res => {
        if (!res.data.status) setStatusCreator(STATUS_CREATOR.preApplication);
        if (res.data?.status === STATUS_CREATOR.submitted)
          setStatusCreator(STATUS_CREATOR.submitted);
        if (res.data?.status === STATUS_CREATOR.approved) {
          setStatusCreator(STATUS_CREATOR.approved);
          storeRole(ROLE.creator);
        }
        if (res.data?.status === STATUS_CREATOR.rejected)
          setStatusCreator(STATUS_CREATOR.rejected);
      })
      .finally(hideLoadingAnim());
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await getSlider();
      setBanners(response);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    fetchCreatorApp();
  }, [fetchCreatorApp]);

  const hasBanner = size(banners) > 0;

  return (
    <div
      className={hasBanner ? styles.topContainerBanner : styles.topContainer}
    >
      <Slider data={banners} />

      {statusCreator === STATUS_CREATOR.preApplication && (
        <CreatorBeforeRegis />
      )}
      {statusCreator === STATUS_CREATOR.rejected && <CreatorBeforeRegis />}
      {statusCreator === STATUS_CREATOR.submitted && (
        <RegistrationWaitConfirm />
      )}
      {statusCreator === STATUS_CREATOR.approved && <CreatorInformation />}
    </div>
  );
};

export default CreatorMypage;

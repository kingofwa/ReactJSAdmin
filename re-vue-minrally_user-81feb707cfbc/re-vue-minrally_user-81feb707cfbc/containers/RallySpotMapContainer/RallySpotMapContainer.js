import { CustomButton } from "@components/common/buttons";
import SpotMap from "@components/common/SpotMap";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { getSpotGame } from "@services/game";
import { message } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./RallySpotMapContainer.module.scss";

const RallySpotMapContainer = ({ id }) => {
  const router = useRouter();

  const [spots, setSpots] = useState([]);

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchSpot = async () => {
    try {
      showLoadingAnim();
      const res = await getSpotGame(id);
      setSpots(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (id) {
      fetchSpot(id);
    }
  }, [id]);

  const onGoMyPage = () => {
    router.push(PATHS.rallyDetail.replace(/\[id\]/, id));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.icBackWrap} onClick={() => router.back()}>
          <img
            src="/icons/ic-back.svg"
            alt="ic-back"
            className={styles.icBack}
          />
        </div>
        <span className={styles.title}>スポットマップ</span>
      </div>

      <div className={styles.map}>
        {/* <img alt="map" src="/img/map.png" /> */}
        <SpotMap spots={spots} zoom={10} />
      </div>

      <div className={styles.actions}>
        <CustomButton size="middle" onClick={onGoMyPage}>
          マップを閉じる
        </CustomButton>
      </div>
    </>
  );
};

export default RallySpotMapContainer;

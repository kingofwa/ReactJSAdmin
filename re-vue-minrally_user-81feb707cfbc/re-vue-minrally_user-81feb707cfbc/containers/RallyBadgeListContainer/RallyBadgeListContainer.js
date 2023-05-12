import React, { useState, useEffect } from "react";
import { CustomButton } from "@components/common/buttons";
import { useRouter } from "next/router";
import { message, Spin } from "antd";
import { getSpotGame } from "@services/game";
import PATHS from "@config/paths";
import styles from "./RallyBadgeListContainer.module.scss";

const RallyBadgeListContainer = ({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [spots, setSpots] = useState([]);
  const [numberPlaying, setNumberPlaying] = useState(0);

  const fetchSpot = async () => {
    try {
      setLoading(true);
      const res = await getSpotGame(id);
      setSpots(res);

      const spotsGame = [...res];
      const spotsPlaying = spotsGame.filter(spot => {
        return spot?.n_of_times_user_checked_in > 0;
      });
      setNumberPlaying(spotsPlaying.length);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoMyPage = () => {
    // router.push(`${PATHS.rallyMypage}/${id}`);
    router.push(PATHS.rallyDetail.replace(/\[id\]/, id));
  };

  useEffect(() => {
    if (id) {
      fetchSpot(id);
    }
  }, [id]);

  const renderSpotItem = spot => {
    return (
      <div className={styles.badgeItem}>
        <div className={styles.badge}>
          {spot?.n_of_times_user_checked_in === 0 ? (
            <img src="/img/badge-sliver.png" alt="badge" />
          ) : (
            <img src="/img/badge-gold.png" alt="badge" />
          )}
        </div>
        <p className={styles.badgeName}>{spot?.name}</p>
      </div>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div onClick={() => router.back()}>
              <img
                src="/icons/ic-back.svg"
                alt="ic-back"
                className={styles.icBack}
              />
            </div>
            <p className={styles.title}>メダル一覧</p>
          </div>

          <div className={styles.content}>
            <p className={styles.badgeTitle}>
              <b className={styles.hightLight}>{numberPlaying}</b> /{" "}
              {spots?.length ?? 0}
            </p>
            <div className={styles.badgeList}>
              {spots?.map(spot => renderSpotItem(spot))}
            </div>
          </div>

          <div className={styles.actions}>
            <CustomButton size="middle" onClick={onGoMyPage}>
              メダル一覧を閉じる
            </CustomButton>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default RallyBadgeListContainer;

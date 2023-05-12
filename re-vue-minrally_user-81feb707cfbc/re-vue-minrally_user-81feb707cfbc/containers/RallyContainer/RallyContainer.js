/* eslint-disable import/no-unresolved */
import RallyDescription from "@components/Rally/RallyDescription";
import RallyInfo from "@components/Rally/RallyInfo";
import RallyPrecautions from "@components/Rally/RallyPrecautions";
import PATHS from "@config/paths";
import { getDetailGame, getSpotGame } from "@services/game";
import { DATE_DOT } from "@utils/date";
import { message, Spin } from "antd";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getIdYouTuBe } from "@utils/get-id-youtube";
import YoutubeIframe from "@components/common/youtube/YoutubeIframe";
import Link from "next/link";
import CheckInSpot from "@components/Rally/RallyDetails/components/CheckInSpot";
import { filter, size } from "lodash";
import CouponSampleModal from "@components/Coupon/CouponSampleModal";
import { isNotExpired } from "@utils/helper";
import styles from "./RallyContainer.module.scss";

const RallyContainer = ({ gameData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [game, setGame] = useState({});
  const [isAllSpotGps, setIsAllSpotGps] = useState(false);
  const [showModalSample, setShowModalSample] = useState(false);

  const { id } = router.query;

  useEffect(() => {
    if (gameData) {
      setGame(gameData);
    }
  }, [gameData]);

  const fetchGameDetail = async () => {
    try {
      setLoading(true);
      const res = await getDetailGame(id);
      setGame(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpot = async () => {
    const spots = await getSpotGame(id);
    const spotGps = filter(
      spots,
      spot => spot?.allow_type_of_checkin === "gps"
    );
    setIsAllSpotGps(size(spots) === size(spotGps));
  };

  useEffect(() => {
    if (id) {
      fetchSpot();
    }
  }, [id]);

  const goToDetail = () => {
    router.push({
      pathname: PATHS.series,
      query: { id: game.serie.id }
    });
  };

  const renderCoupon = () => {
    if (game?.coupon_reward_template) {
      return (
        <>
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>制覇報酬1</span>
            <span className={styles.rallyText}>賞状画像</span>
          </div>
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>制覇報酬2</span>
            <div className={styles.rallyCoupon}>
              <span className={styles.rallyText}>クーポン</span>
              <div
                className={styles.rallyCouponBtn}
                onClick={() => setShowModalSample(true)}
              >
                詳細情報
              </div>
            </div>
          </div>
        </>
      );
    }
    return (
      <div className={styles.rallyRow}>
        <span className={styles.rallyLabel}>制覇報酬</span>
        <span className={styles.rallyText}>賞状画像</span>
      </div>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        <RallyInfo
          game={game}
          fetchGameDetail={fetchGameDetail}
          isLoading={loading}
        />
        <div className={styles.rallyInfo}>
          <div className={styles.rallyRow}>
            <span className={styles.rallyInfoTitle}>ラリー情報</span>
          </div>
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>スポット数</span>
            <span className={styles.rallyText}>
              {game?.number_of_spots}箇所
            </span>
          </div>
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>移動距離</span>
            <span className={styles.rallyText}>
              約{(game?.moving_distance?.closest / 1000).toFixed(1)}km〜
              {(game?.moving_distance?.farthest / 1000).toFixed(1)}km
            </span>
          </div>
          {/* <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>制覇報酬</span>
            <span className={styles.rallyText}>賞状画像</span>
          </div> */}

          {renderCoupon()}

          {game?.serie && (
            <div className={styles.rallyRow}>
              <span className={styles.rallyLabel}>グランドラリー</span>
              <span className={styles.rallyLabelPrimary} onClick={goToDetail}>
                {game?.serie?.name}
              </span>
            </div>
          )}

          {game?.start_date && (
            <div className={styles.rallyRow}>
              <span className={styles.rallyLabel}>開始日</span>
              <span className={styles.rallyText}>
                {moment(game?.start_date).tz("Asia/Tokyo").format(DATE_DOT)}{" "}
                から
              </span>
            </div>
          )}

          {game?.end_date && (
            <div className={styles.rallyRow}>
              <span className={styles.rallyLabel}>終了日</span>
              <span className={styles.rallyText}>
                {moment(game?.end_date).tz("Asia/Tokyo").format(DATE_DOT)} まで
              </span>
            </div>
          )}

          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>公開日</span>
            <span className={styles.rallyText}>
              {moment(game?.published_at).format(DATE_DOT)}
            </span>
          </div>

          {isAllSpotGps &&
            isNotExpired(gameData?.start_date, gameData?.end_date) && (
              <CheckInSpot
                gameId={id}
                callback={fetchGameDetail}
                rallyName={game?.name}
              />
            )}
        </div>

        <RallyDescription game={game} />

        {size(game?.youtube_video_list) > 0 && (
          <div className={styles.rallySection}>
            <div className={styles.rallyRow}>
              <span className={styles.rallyInfoTitle}>動画</span>
            </div>
            {game?.youtube_video_list?.map(item => {
              const embedId = getIdYouTuBe(item);
              return <YoutubeIframe embedId={embedId} />;
            })}
          </div>
        )}

        {size(game?.related_links) > 0 && (
          <div className={styles.rallySection}>
            <div className={styles.rallyRow}>
              <span className={styles.rallyInfoTitle}>関連リンク</span>
            </div>
            {game?.related_links?.map(item => (
              <div className={styles.rallyRowLink}>
                <Link href={item?.url}>
                  <a className={styles.rallyRelatedLink} target="_blank">
                    {item?.name}
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}

        <RallyPrecautions
          note={game?.note}
          noteUpdate={game?.note_updated_at}
          creator={game?.owner?.user_name}
        />

        <CouponSampleModal
          visible={showModalSample}
          onClose={() => setShowModalSample(false)}
        />
      </Spin>
    </>
  );
};

export default RallyContainer;

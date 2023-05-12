/* eslint-disable import/no-unresolved */
import { CustomButton } from "@components/common/buttons";
// import CheckIn from "@components/Rally/RallyDetails/components/CheckIn";
import RallyInfo from "@components/Rally/RallyInfo";
import PATHS from "@config/paths";
import { getDetailGame, getFootprints, getSpotGame } from "@services/game";
import { DATE_DOT } from "@utils/date";
import { Spin } from "antd";
// import useSwitchVersion from "hooks/useSwitchVersion";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/auth";
import { filter, isEmpty, map, size } from "lodash";
import CheckInSpot from "@components/Rally/RallyDetails/components/CheckInSpot";
import ScannerQrCodeModal from "@components/ScannerQrCodeModal";
import { QrCodeEnum } from "@utils/constants";
import CouponBtn from "@components/Coupon/CouponBtn";
import { isNotExpired } from "@utils/helper";
import styles from "./RallyMyPageContainer.module.scss";

const RallyMyPageContainer = ({ gameData }) => {
  const router = useRouter();
  const { id } = router.query;

  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [spots, setSpots] = useState([]);
  const [footprints, setFootprints] = useState({});
  const [numberPlaying, setNumberPlaying] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalScanner, setShowModalScanner] = useState(false);
  const [isAllSpotGps, setIsAllSpotGps] = useState(false);

  useEffect(() => {
    setGame(gameData);
  }, [gameData]);

  const fetchGameDetail = async isFirst => {
    try {
      if (isFirst) {
        setIsLoading(true);
      }
      const res = await getDetailGame(id);
      setGame(res);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFootprints = async () => {
    try {
      const response = await getFootprints(id);
      setFootprints(response);
    } catch (error) {
      // message.error(error);
    }
  };

  const fetchSpot = async () => {
    const listSpots = await getSpotGame(id);

    const spotGps = filter(
      listSpots,
      spot => spot?.allow_type_of_checkin === QrCodeEnum.GPS
    );
    setIsAllSpotGps(size(listSpots) === size(spotGps));

    setSpots(listSpots);
    const spotsPlaying = filter(listSpots, spot => {
      return spot?.n_of_times_user_checked_in > 0;
    });
    setNumberPlaying(spotsPlaying.length);
  };

  const getInitData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        // fetchGameDetail(true),
        fetchSpot(),
        fetchFootprints()
      ]);
    } catch (error) {
      // message.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCheckinSuccess = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchSpot(), fetchFootprints()]);
    } catch (error) {
      //
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getInitData();
    }
  }, [id]);

  const onGoCompletePage = () => {
    router.push({
      pathname: PATHS.rallyComplete,
      query: { id }
    });
  };

  const onGoSpotMapPage = () => {
    router.push(`${PATHS.rallyMypageSpotMap}/${id}`);
  };

  const onGoSpotDetailPage = spotId => {
    router.push(`${PATHS.rallyMypageSpotDetail}/${spotId}`, undefined, {
      scroll: false
    });
  };

  const onGoBadgeList = () => {
    router.push(`${PATHS.rallyMypageBadgeList}/${id}`, undefined, {
      scroll: false
    });
  };

  const onRallyFastest = () => {
    const url = PATHS.rallyFastestFinishTime.replace(/:id/, id);
    router.push(url, undefined, { scroll: false });
  };

  const onRallyTimesCompleted = () => {
    const url = PATHS.rallyNumberOfTimesCompleted.replace(/:id/, id);
    router.push(url, undefined, { scroll: false });
  };

  const renderSpotItem = (spot, index) => {
    return (
      <div
        className={styles.spotItem}
        key={index}
        onClick={() => onGoSpotDetailPage(spot?.id)}
      >
        <div className={styles.spotContent}>
          <div className={styles.spotTitleInfo}>
            {spot?.n_of_times_user_checked_in === 0 ? (
              <img
                src="/icons/ic-checker-inactive.svg"
                alt="ic-check"
                className={styles.icCheck}
              />
            ) : (
              <img
                src="/icons/ic-checker-active.svg"
                alt="ic-check"
                className={styles.icCheck}
              />
            )}
            <p className={styles.spotTitle}>{spot?.name}</p>
          </div>
          {spot?.n_of_times_user_checked_in > 0 && (
            <div className={styles.spotInfo}>
              <span>最終チェックイン</span>
              {spot?.n_of_times_user_checked_in === 0 ? (
                <span>-</span>
              ) : (
                <>
                  <span>
                    {moment(spot?.latest_checked_in_at).format(DATE_DOT)}
                  </span>
                  <span>{spot?.n_of_times_user_checked_in}回目</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSpotList = () => {
    return (
      <div className={styles.spotList}>
        <div className={styles.spotListTitle}>
          <span>
            スポットリスト(<b className={styles.hightLight}>{numberPlaying}</b>{" "}
            / {spots?.length ?? 0})
          </span>
        </div>
        {map(spots, (spot, index) => renderSpotItem(spot, index))}
      </div>
    );
  };

  const renderHistory = () => {
    return (
      <div className={styles.history}>
        <div className={styles.historyTitle}>
          <span>これまでの足跡</span>
        </div>
        <div className={styles.historyRow}>
          <p className={styles.historyLabel}>制覇記録</p>
          <p className={styles.historyInfo}>
            {footprints?.completion_record ?? 0}回
          </p>
          {footprints?.completion_record > 0 && (
            <div onClick={onGoCompletePage} className={styles.goDetail}>
              <img
                src="/icons/ic-go-detail.svg"
                alt="ic-go-detail"
                className={styles.icGoDetail}
              />
            </div>
          )}
        </div>
        <div className={styles.historyRow}>
          <p className={styles.historyLabel}>最速制覇時間</p>
          <p className={styles.historyInfo}>
            {!isEmpty(footprints?.fastest_finish_time)
              ? `${footprints?.fastest_finish_time?.days}日${footprints?.fastest_finish_time?.hours}時間${footprints?.fastest_finish_time?.minutes}分`
              : "記録なし"}
          </p>
        </div>
        <div className={styles.historyRow}>
          <p className={styles.historyLabel}>制覇速度ランキング</p>
          <p className={styles.historyInfo}>
            {footprints?.completion_speed_ranking ? (
              <span className={styles.hightLight} onClick={onRallyFastest}>
                {footprints?.completion_speed_ranking}位
              </span>
            ) : (
              <span className={styles.historyInfo}>記録なし</span>
            )}
          </p>
        </div>
        <div className={styles.historyRow}>
          <p className={styles.historyLabel}>制覇回数ランキング</p>
          <p className={styles.historyInfo}>
            {footprints?.completion_count_ranking ? (
              <span
                className={styles.hightLight}
                onClick={onRallyTimesCompleted}
              >
                {footprints?.completion_count_ranking}位
              </span>
            ) : (
              <span className={styles.historyInfo}>記録なし</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Spin spinning={loading}>
        <RallyInfo
          game={game}
          fetchGameDetail={fetchGameDetail}
          isLoading={isLoading}
        />
        <div>
          <div className={styles.actions}>
            <CustomButton size="middle" onClick={onGoSpotMapPage}>
              <img
                className={styles.iconLocation}
                alt="ic"
                src="/icons/ic-location.svg"
              />
              スポットマップ
            </CustomButton>
            <CustomButton size="middle" onClick={onGoBadgeList}>
              <img
                className={styles.iconCollected}
                alt="ic"
                src="/icons/ic-collected.svg"
              />
              集めたメダル
            </CustomButton>
          </div>

          {!isAllSpotGps && !loading && (
            <div className={styles.note}>
              当ラリーは、通常のチェックインの他、QRコードでのチェックインを利用するスポットがあります。
              <br />
              チェックインは、
              <b>
                スポットリストからスポットをクリックした上で行ってください。
              </b>
            </div>
          )}
        </div>

        {renderSpotList()}

        {auth.isLoggedIn && renderHistory()}

        {auth?.isLoggedIn && game?.current_status?.has_coupon_rewards && (
          <div className={styles.CouponWrapper}>
            <CouponBtn
              onClick={() => {
                router.push({
                  pathname: PATHS.rallyCoupon,
                  query: { id }
                });
              }}
            />
          </div>
        )}

        {isAllSpotGps &&
          isNotExpired(gameData?.start_date, gameData?.end_date) && (
            <CheckInSpot
              gameId={id}
              callback={onCheckinSuccess}
              rallyName={game?.name}
            />
          )}

        <ScannerQrCodeModal
          visible={showModalScanner}
          onClose={() => setShowModalScanner(false)}
        />
      </Spin>
    </>
  );
};

export default RallyMyPageContainer;

/* eslint-disable import/no-unresolved */
// import RallyCertiModal from "@components/CreateRally/SystemSettings/RallyCertiModal";
import {
  addUserFollower,
  deleteUserFollower
} from "@components/mypage/service";
import HeaderSeri from "@components/Series/components/Header";
import { LoaderContext } from "@contexts/loader";
import { favoriteSeri, unFavoriteSeri } from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { DATE_DOT } from "@utils/date";
import { message } from "antd";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import { useCallback, useContext, useEffect, useState } from "react";
import RallyCertiModal from "@components/RallyCreate/SystemSetting/RallyCertiModal";
import { size } from "lodash";
import CouponSampleModal from "@components/Coupon/CouponSampleModal";
import { getSeriesDetail } from "../services";

import styles from "./styles.module.scss";

const SeriDetail = ({ serieId, serieDetail }) => {
  const router = useRouter();
  const auth = useAuth();
  const [serieData, setSerieData] = useState();
  const [isOpenRallyModal, setIsOpenRallyModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModalSample, setShowModalSample] = useState(false);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  useEffect(() => {
    if (serieDetail) {
      setSerieData(serieDetail);
    }
  }, [serieDetail]);

  const fetchSeriesDetail = async isFirst => {
    try {
      if (isFirst) {
        setIsLoading(true);
      }
      showLoadingAnim();
      const data = await getSeriesDetail(serieId);
      setSerieData(data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setIsLoading(false);
      hideLoadingAnim(false);
    }
  };

  const handleFavoriteSeri = useCallback(() => {
    if (auth.isLoggedIn) {
      if (serieData?.is_favorite) {
        unFavoriteSeri(serieId)
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      } else {
        favoriteSeri({ serie_id: serieId })
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      }
    } else {
      const newSerieData = {
        ...serieData,
        is_favorite: !serieData.is_favorite,
        number_of_favorites: serieData.is_favorite
          ? serieData?.number_of_favorites - 1
          : serieData?.number_of_favorites + 1
      };
      setSerieData(newSerieData);
    }
  }, [serieId, serieData?.is_favorite]);

  const handleFollow = useCallback(
    id => {
      showLoadingAnim();
      addUserFollower({ user_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleUnFollow = useCallback(
    id => {
      showLoadingAnim();
      deleteUserFollower(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
            // const newArray = updateReaction(listResult, id, "is_following");
            // setListResult([...newArray]);
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleFollowUser = () => {
    if (auth?.isLoggedIn) {
      if (!serieData?.owner?.is_following) {
        handleFollow(serieData?.owner?.id);
      } else {
        handleUnFollow(serieData?.owner?.id);
      }
    }
    router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
  };

  const renderCoupon = () => {
    if (serieData?.coupon_reward_template) {
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
      <HeaderSeri
        serieDetail={serieData}
        handleFavoriteSeri={handleFavoriteSeri}
        handleFollowUser={handleFollowUser}
        serieId={serieId}
        profileId={serieData?.owner?.id}
        isLoading={isLoading}
      />

      <div className={styles.seriInfo}>
        <div className={styles.rallyRow}>
          <span className={styles.seriInfoTitle}>グランドラリー情報</span>
        </div>
        <div className={styles.rallyRow}>
          <span className={styles.rallyLabel}>ラリー数</span>
          <span className={styles.rallyText}>
            {serieData?.number_of_games}ラリー
          </span>
        </div>
        <div className={styles.rallyRow}>
          <span className={styles.rallyLabel}>移動距離</span>
          <span className={styles.rallyText}>
            約
            {serieData?.moving_distance?.closest
              ? (serieData?.moving_distance?.closest / 1000).toFixed(1)
              : 0}
            km〜
            {serieData?.moving_distance?.closest
              ? (serieData?.moving_distance?.farthest / 1000).toFixed(1)
              : 0}
            km
          </span>
        </div>
        {renderCoupon()}
        {/* <div className={styles.rallyRow}>
          <span className={styles.rallyLabel}>オリジナル報酬</span>
          <div className={styles.rallyLabelPrimary}>
            {serieDetail?.certificate_image_template ? (
              <>
                <span>{serieDetail?.serie?.name}あり</span>

                <Button
                  className={styles.detailBtn}
                  onClick={() => setIsOpenRallyModal(true)}
                >
                  詳細情報
                </Button>
              </>
            ) : (
              <span>{serieDetail?.serie?.name}ない</span>
            )}
          </div>
        </div> */}
        {serieData?.start_date && (
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>開始日</span>
            <span className={styles.rallyText}>
              {`${moment(serieData?.start_date)
                .tz("Asia/Tokyo")
                .format(DATE_DOT)} から`}
            </span>
          </div>
        )}

        {serieData?.end_date && (
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>終了日</span>
            <span className={styles.rallyText}>
              {`${moment(serieData?.end_date)
                .tz("Asia/Tokyo")
                .format(DATE_DOT)} まで`}
            </span>
          </div>
        )}

        {serieData?.published_date && (
          <div className={styles.rallyRow}>
            <span className={styles.rallyLabel}>公開日</span>
            {serieData?.published_date ? (
              <span className={styles.rallyText}>
                {moment(serieData?.published_date).format(DATE_DOT)}
              </span>
            ) : (
              <span className={styles.rallyText} />
            )}
          </div>
        )}
      </div>

      {/* <div className={styles.seriInfo}>
        <div className={styles.rallyRow}>
          <span className={styles.seriInfoTitle}>バージョン情報</span>
        </div>
        <div className={styles.rallyRow}>
          <span className={styles.rallyLabel}>バージョン</span>
          <span className={styles.rallyText}>Ver.0.0</span>
        </div>
      </div> */}
      {/* <RallyDescription game={serieDetail} /> */}
      {size(serieData?.description) > 0 && (
        <div className={styles.rallyDescription}>
          <div className={styles.rowTitle}>
            <p className={styles.title}>グランドラリー説明</p>
          </div>
          <div className={styles.content}>{serieData?.description}</div>
        </div>
      )}

      {serieData?.certificate_image_template && (
        <RallyCertiModal
          visible={isOpenRallyModal}
          closeModal={() => setIsOpenRallyModal(false)}
          gameId={serieId}
          isOnlyView
        />
      )}
      <CouponSampleModal
        visible={showModalSample}
        onClose={() => setShowModalSample(false)}
      />
    </>
  );
};

export default SeriDetail;

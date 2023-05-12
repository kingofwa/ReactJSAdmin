import GameMenu from "@components/common/header/GameMenu";
import { RALLY_MENU } from "@config/constants";
import PATHS from "@config/paths";
import ModalShare from "@containers/CreateRallyPublicCompletedContainer/ModalShare";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { favoriteGame, unFavoriteGame } from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import useMe from "hooks/useMe";
import { replace } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import RenderButtonFollow from "@components/ButtonFollow";
import ImageFallback from "@components/common/ImageFallback";
import CouponRewardsBtn from "@components/Coupon/CouponRewardsBtn";
import moment from "moment-timezone";
import { DATE_DEFAULT, DATE_DOT } from "@utils/date";
import "react-image-lightbox/style.css";
import styles from "./RallyInfo.module.scss";

const RallyInfo = ({ game, fetchGameDetail, isLoading }) => {
  const router = useRouter();
  const isSelf = useMe(game?.owner?.id);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [rallyDetail, setRallyDetail] = useState();
  const auth = useAuth();
  const [showModalShare, setShowModalShare] = useState(false);
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);

  useEffect(() => {
    setRallyDetail(game);
  }, [game]);

  const handleFavoriteRally = useCallback(
    id => {
      showLoadingAnim();
      favoriteGame({ game_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchGameDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [rallyDetail]
  );

  const handleUnFavoriteRally = useCallback(
    id => {
      showLoadingAnim();
      unFavoriteGame(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchGameDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [rallyDetail]
  );

  const handleFavorite = () => {
    if (auth.isLoggedIn) {
      if (rallyDetail?.is_favorite) {
        handleUnFavoriteRally(rallyDetail.id);
      } else {
        handleFavoriteRally(rallyDetail.id);
      }
    } else {
      // router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      const newRallyData = {
        ...rallyDetail,
        is_favorite: !rallyDetail.is_favorite,
        number_of_favorites: rallyDetail.is_favorite
          ? rallyDetail?.number_of_favorites - 1
          : rallyDetail?.number_of_favorites + 1
      };
      setRallyDetail(newRallyData);
    }
  };

  const goProfile = () => {
    router.push(PATHS.profileCreatorRally.replace(/\[id\]/, game.owner.id));
  };

  const renderButtonFollower = () => {
    if (!isSelf) {
      return <RenderButtonFollow profile={rallyDetail?.owner} />;
    }

    return null;
  };

  const renderLimitTime = () => {
    const startDate = rallyDetail?.start_date;
    const endDate = rallyDetail?.end_date;
    if (endDate && startDate) {
      return <div className={styles.limitTime}>期間限定</div>;
    }
    return null;
  };

  const renderTitlePrefix = () => {
    if(rallyDetail?.start_date && rallyDetail?.end_date) {
      const startDate = moment(rallyDetail?.start_date).tz('Asia/Tokyo');
      const endDate = moment(rallyDetail?.end_date).tz('Asia/Tokyo');
      const currentDate = moment().tz("Asia/Tokyo").format(DATE_DEFAULT);
      if(currentDate < startDate.format(DATE_DEFAULT)) {
        return "【開始前】";
      }
      if(currentDate > endDate.format(DATE_DEFAULT)) {
        return "【終了】";
      }
    }
    
    return null;
  }

  const renderOverlayImage = () => {
    if(rallyDetail?.start_date && rallyDetail?.end_date) {
      const startDate = moment(rallyDetail?.start_date).tz('Asia/Tokyo');
      const endDate = moment(rallyDetail?.end_date).tz('Asia/Tokyo');
      const currentDate = moment().tz("Asia/Tokyo").format(DATE_DEFAULT);
      if(currentDate < startDate.format(DATE_DEFAULT)) {
        return <div className={styles.imageOverlay}>
          このラリーは<br/>
          {startDate.format(DATE_DOT)}から<br/>
          開始いたします
        </div>;
      }
      if(currentDate > endDate.format(DATE_DEFAULT)) {
        return <div className={styles.imageOverlay}>
          このラリーは<br/>
          終了いたしました
        </div>;
      }
    }
    return null;
  }

  const goSearchTag = tag => {
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  const urlShare = `${process.env.NEXT_PUBLIC_APP_HOST}${router.asPath}`;

  const urlPhoto = rallyDetail?.top_photo_url || rallyDetail?.google_image_url;

  const onShowLightBox = () => {
    setIsOpenLightBox(true);
  };

  return (
    <>
      <div className={styles.rally}>
        <div className={styles.rallyContent}>
          <div className={styles.rallyTitle}>
            <div className={styles.icBackWrap} onClick={() => router.back()}>
              <img
                src="/icons/ic-back.svg"
                alt="ic-back"
                className={styles.icBack}
              />
            </div>
            <p className={styles.title}>
              {renderTitlePrefix()}
              {rallyDetail?.name}
            </p>
          </div>
          <div className={styles.tags}>
            {rallyDetail?.tag_list?.map(tag => {
              return (
                <span
                  className={styles.tag}
                  key={tag + Math.random()}
                  onClick={() => goSearchTag(tag)}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          <div className={styles.shareWrapper}>
            <div className={styles.reaction}>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-participation.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>
                  {rallyDetail?.number_of_players}
                </span>
              </div>
              <div className={styles.reactionItem}>
                <img
                  className={styles.reactionIcon}
                  src="/icons/ic-read.svg"
                  alt="icon"
                />
                <span className={styles.reactionLabel}>
                  {rallyDetail?.number_of_checked_in}
                </span>
              </div>
              <div className={styles.reactionItem}>
                <div onClick={handleFavorite}>
                  <img
                    className={styles.reactionIcon}
                    src={
                      rallyDetail?.is_favorite
                        ? "/icons/ic-like.svg"
                        : "/icons/ic-un-like.svg"
                    }
                    alt="icon"
                  />
                </div>
                <span className={styles.reactionLabel}>
                  {rallyDetail?.number_of_favorites}
                </span>
              </div>
            </div>
            <div
              className={styles.share}
              onClick={() => setShowModalShare(true)}
            >
              シェア
              <img
                src="/icons/ic-share.svg"
                alt="ic-share"
                className={styles.icShare}
              />
            </div>
          </div>
        </div>

        {auth?.isLoggedIn &&
          game?.current_status?.has_available_coupon_rewards && (
            <CouponRewardsBtn
              title="未利用の報酬があります"
              onClick={() => {
                router.push({
                  pathname: PATHS.rallyCoupon,
                  query: { id: rallyDetail?.id }
                });
              }}
            />
          )}

        <div className={styles.rallyImage}>
          <div onClick={onShowLightBox} className={styles.img}>
            <ImageFallback
              src={urlPhoto}
              alt="rally-img"
              isLoading={isLoading}
            />
          </div>
          {renderOverlayImage()}
          <div className={styles.userInfo}>
            <div className={styles.avt} onClick={goProfile}>
              <img
                src={rallyDetail?.owner?.avatar_url || "/img/avatar-holder.svg"}
                alt="avt"
              />
            </div>
            <div className={styles.userName} onClick={goProfile}>
              {rallyDetail?.owner?.user_name}
            </div>
            {renderButtonFollower()}
          </div>
          {renderLimitTime()}
        </div>
      </div>
      <GameMenu menus={RALLY_MENU} />
      <ModalShare
        visible={showModalShare}
        onClose={() => setShowModalShare(false)}
        urlShare={urlShare}
      />
      {urlPhoto && isOpenLightBox && (
        <Lightbox
          mainSrc={urlPhoto}
          onCloseRequest={() => setIsOpenLightBox(false)}
        />
      )}
    </>
  );
};

export default RallyInfo;

import Tab from "@components/common/tab";
import { SERI_MENU } from "@config/constants";
import PATHS from "@config/paths";
import ModalShare from "@containers/CreateRallyPublicCompletedContainer/ModalShare";
import { Button } from "antd";
import useMe from "hooks/useMe";
import { isEmpty, replace } from "lodash";
import RenderButtonFollow from "@components/ButtonFollow";
// import useSwitchVersion from "hooks/useSwitchVersion";
import { useRouter } from "next/router";
import { useState } from "react";
import Lightbox from "react-image-lightbox";
import ImageFallback from "@components/common/ImageFallback";
import { useAuth } from "@contexts/auth";
import "react-image-lightbox/style.css";
import moment from "moment-timezone";
import { DATE_DEFAULT, DATE_DOT } from "@utils/date";
import styles from "./styles.module.scss";

const HeaderSeri = ({
  serieId,
  serieDetail,
  handleFavoriteSeri,
  isLoading,
  hasCouponRewards
}) => {
  const router = useRouter();
  // const { renderSwitchVersion } = useSwitchVersion();

  const [showModalShare, setShowModalShare] = useState(false);
  const [isOpenLightBox, setIsOpenLightBox] = useState(false);
  const auth = useAuth();
  const isMe = useMe(serieDetail?.owner?.id);

  const goToDetail = () => {
    router.push({
      pathname: PATHS.profileCreatorGrandRally,
      query: { id: serieDetail?.owner?.id }
    });
  };

  const goSearchTag = tag => {
    const queryTag = replace(tag, new RegExp(/#/, "g"), "");
    router.push(`${PATHS.searchRallyResult}?tag=${queryTag}`);
  };

  const urlShare = `${process.env.NEXT_PUBLIC_APP_HOST}${router.asPath}`;

  const renderLimitTime = () => {
    const endDate = serieDetail?.end_date;
    if (endDate) {
      return (
        <div className={styles.time}>
          <span>期間限定</span>
        </div>
      );
    }
    return null;
  };

  const renderTitlePrefix = () => {
    const startDate = serieDetail?.start_date;
    const endDate = serieDetail?.end_date;
    if (!endDate && !endDate) {
      return null;
    }
    const currentDate = moment().tz("Asia/Tokyo").format(DATE_DEFAULT);
    if (currentDate < moment(startDate).tz("Asia/Tokyo").format(DATE_DEFAULT)) {
      return "【開始前】";
    }
    if (currentDate > moment(endDate).tz("Asia/Tokyo").format(DATE_DEFAULT)) {
      return "【終了】";
    }
    return null;
  };

  const renderOverlayImage = () => {
    if (serieDetail?.start_date && serieDetail?.end_date) {
      const startDate = moment(serieDetail?.start_date).tz("Asia/Tokyo");
      const endDate = moment(serieDetail?.end_date).tz("Asia/Tokyo");
      const currentDate = moment().tz("Asia/Tokyo").format(DATE_DEFAULT);
      if (currentDate < startDate.format(DATE_DEFAULT)) {
        return (
          <div className={styles.imageOverlay}>
            このグランドラリーは
            <br />
            {startDate.format(DATE_DOT)}から
            <br />
            開始いたします
          </div>
        );
      }
      if (currentDate > endDate.format(DATE_DEFAULT)) {
        return (
          <div className={styles.imageOverlay}>
            このグランドラリーは <br />
            終了いたしました
          </div>
        );
      }
    }
    return null;
  };

  const seriesPhoto =
    serieDetail?.top_photo_url || serieDetail?.google_image_url;

  const onShowLightBox = () => {
    setIsOpenLightBox(true);
  };

  return (
    <>
      <div className={styles.head}>
        <div className={styles.nameSerie}>
          <div onClick={() => router.back()}>
            <img
              src="/icons/ic-back.svg"
              alt="ic-back"
              className={styles.icBack}
            />
          </div>
          <div className={styles.serieTitle}>
            {renderTitlePrefix()}
            {serieDetail?.name}
          </div>
        </div>
        <div className={styles.tagList}>
          {serieDetail?.tag_list?.map(item => (
            <span
              className={styles.tagItem}
              key={item + Math.random()}
              onClick={() => goSearchTag(item)}
            >
              {item}
            </span>
          ))}
        </div>
        <div className={styles.interactive}>
          <div className={styles.react}>
            <div className={styles.reactItem}>
              <img src="/img/mypage/people.svg" alt="people" />
              {serieDetail?.number_of_players}
            </div>
            <div className={styles.reactItem}>
              <img src="/img/mypage/check.png" alt="check" />
              {serieDetail?.number_of_checked_in}
            </div>
            <div
              onClick={handleFavoriteSeri}
              className={`${styles.reactItem} ${styles.heartIcon}`}
            >
              {serieDetail?.is_favorite ? (
                <img src="/img/profile/like.svg" alt="like" />
              ) : (
                <img src="/img/mypage/heart.png" alt="unlike" />
              )}
              {serieDetail?.number_of_favorites}
            </div>
          </div>
          <Button
            className={styles.btnShare}
            onClick={() => setShowModalShare(true)}
          >
            シェア
            <img src="/icons/ic-share-white.png" alt="ic-share-white" />
          </Button>
        </div>

        {auth?.isLoggedIn && hasCouponRewards && (
          <div
            className={styles.CouponWrapper}
            onClick={() => {
              router.push({
                pathname: PATHS.grandCoupon,
                query: { id: serieId }
              });
            }}
          >
            <div className={styles.Coupon}>未利用の報酬があります</div>
          </div>
        )}

        <div className={styles.nameWrap}>
          {renderLimitTime()}
          <div className={styles.seriImage}>
            <div className={styles.img} onClick={onShowLightBox}>
              <ImageFallback
                src={seriesPhoto}
                isLoading={isLoading}
                alt="img-series"
              />
            </div>
            {renderOverlayImage()}
            <div className={styles.userInfo}>
              <div className={styles.avt} onClick={goToDetail}>
                <img
                  src={
                    serieDetail?.owner?.avatar_url || "/img/avatar-holder.svg"
                  }
                  alt="avt"
                />
              </div>
              <div className={styles.userName} onClick={goToDetail}>
                {serieDetail?.owner?.user_name}
              </div>
              {!isMe && (
                <>
                  <RenderButtonFollow profile={serieDetail?.owner} />
                </>
              )}
            </div>
          </div>
        </div>
        <Tab tabs={SERI_MENU} id={serieId} className={styles.tabTop} />
        {/* {renderSwitchVersion()} */}
      </div>
      <ModalShare
        visible={showModalShare}
        onClose={() => setShowModalShare(false)}
        urlShare={urlShare}
      />

      {!isEmpty(seriesPhoto) && isOpenLightBox && (
        <Lightbox
          mainSrc={seriesPhoto}
          onCloseRequest={() => setIsOpenLightBox(false)}
        />
      )}
    </>
  );
};
export default HeaderSeri;

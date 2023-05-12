/* eslint-disable no-plusplus */
import { CustomButton } from "@components/common/buttons";
import CouponRewardsBtn from "@components/Coupon/CouponRewardsBtn";
import CouponSampleModal from "@components/Coupon/CouponSampleModal";
import ErrorCheckInModal from "@components/Rally/Modal/ErrorCheckInModal";
import SpotMemoryModal from "@components/Rally/Modal/SpotMemoryModal";
import CheckInSpot from "@components/Rally/RallyDetails/components/CheckInSpot";
import ReviewItem from "@components/ReviewItem";
import ScannerQrCodeButton from "@components/ScannerQrCodeButton";
import ScannerQrCodeModal from "@components/ScannerQrCodeModal";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { getSpotComment, getSpotDetail } from "@services/game";
import { COMMENT_TYPE, QrCodeEnum } from "@utils/constants";
import { DATE_DEFAULT } from "@utils/date";
import { isNotExpired } from "@utils/helper";
import { List, message, Spin } from "antd";
import { get, isEmpty, size } from "lodash";
import moment from "moment-timezone";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import CarouselImage from "./elements/CarouselImage";
import styles from "./RallySpotDetailContainer.module.scss";

const RallySpotDetailContainer = ({ isCheckin }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [spotDetail, setSpotDetail] = useState({});
  const [showModalErr, setShowModalErr] = useState(false);
  const [showModalCmt, setShowModalCmt] = useState(false);
  const [spotCmt, setSpotCmt] = useState();
  const [photos, setPhotos] = useState([]);
  const [rallyInfo, setRallyInfo] = useState();
  const [showModalScanner, setShowModalScanner] = useState(false);
  const [isCheckinQrCode, setIsCheckinQrCode] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const [showModalSample, setShowModalSample] = useState(false);

  const { id } = router.query;

  const auth = useAuth();

  const fetchSpotComment = async () => {
    try {
      // setLoading(true);
      const response = await getSpotComment(id);
      setSpotCmt(response);
    } catch (error) {
      message.error(error?.message);
    } finally {
      // setLoading(false);
    }
  };

  const fetchSpotDetail = async () => {
    try {
      setLoading(true);
      const res = await getSpotDetail(id);
      const isQrCode = get(res, "data.allow_type_of_checkin");
      setIsCheckinQrCode(isQrCode === QrCodeEnum.QR_CODE);
      setSpotDetail(res?.data);
      const hasAvailableCoupon = get(
        res,
        "extra.current_status.has_available_coupon_rewards"
      );
      setHasCoupon(hasAvailableCoupon);
      if (size(res?.data?.photo_urls) > 0) {
        setPhotos(res?.data?.photo_urls);
      } else {
        setPhotos([res?.data?.google_image_url]);
      }
      setRallyInfo(res?.extra?.game);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSpotDetail();
      fetchSpotComment();
    }
  }, [id]);

  const isDisabledComment = () => {
    return spotDetail?.n_of_times_user_checked_in < 1;
  };

  const onGoBack = () => {
    // if (isCheckin) {
    //   const urlRally = PATHS.rallyDetail.replace(/\[id\]/, rallyInfo?.id);
    //   router.replace(urlRally);
    // } else {
    //   router.back();
    // }

    const urlRally = PATHS.rallyDetail.replace(/\[id\]/, rallyInfo?.id);
    router.replace(urlRally);
  };

  return (
    <>
      <Spin spinning={loading}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.headerBack}>
              <div onClick={onGoBack}>
                <img
                  src="/icons/ic-back.svg"
                  alt="ic-back"
                  className={styles.icBack}
                />
              </div>
              <p className={styles.title}>{spotDetail?.name}</p>
            </div>

            {spotDetail?.n_of_times_user_checked_in > 0 && (
              <div className={styles.subtitleWrapper}>
                <img
                  src="/icons/ic-checker.svg"
                  alt="ic-checker"
                  className={styles.icChecker}
                />
                <p className={styles.subTitle}>
                  最終チェックイン{" "}
                  <span>
                    {moment(spotDetail?.latest_checked_in_at).format(
                      DATE_DEFAULT
                    )}
                  </span>
                  <span> {spotDetail?.n_of_times_user_checked_in}回目</span>
                </p>
              </div>
            )}
          </div>

          {auth?.isLoggedIn && hasCoupon && (
            <CouponRewardsBtn
              title="未利用の報酬があります"
              onClick={() => {
                router.push({
                  pathname: PATHS.spotCoupon,
                  query: { id: spotDetail?.id }
                });
              }}
            />
          )}

          <CarouselImage photos={photos} isLoading={loading} />
          {spotDetail?.description && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  ラリーマスターによるスポット解説
                </span>
              </div>
              <div className={styles.cardContent}>
                {spotDetail?.description}
              </div>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>住所</span>
            </div>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${spotDetail?.lat},${spotDetail?.lng}`}
            >
              <a className={styles.address} target="_blank">
                {spotDetail?.address}
              </a>
            </Link>
          </div>

          {size(spotDetail?.related_links) > 0 && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>関連リンク</span>
              </div>
              {spotDetail?.related_links?.map(item => (
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

          {spotDetail?.coupon_reward_template && (
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>チェックイン報酬</span>
              </div>
              <div className={styles.CouponContent}>
                <span>クーポン</span>
                <div
                  className={styles.CouponBtn}
                  onClick={() => setShowModalSample(true)}
                >
                  詳細情報
                </div>
              </div>
            </div>
          )}

          {spotDetail?.number_of_last_7days_checked_in > 50 && (
            <div className={styles.tag}>
              <CustomButton size="middle" variant="primaryOutline">
                過去7日以内に50人がチェックインしました
              </CustomButton>
            </div>
          )}

          <div className={styles.review}>
            <div className={styles.reviewTitle}>
              <p>スポットメモリー</p>
              <span>{spotCmt?.length}件</span>
            </div>
            {!isDisabledComment() && (
              <div className={styles.actions}>
                <div className={styles.action}>
                  <CustomButton
                    size="middle"
                    variant="primary"
                    onClick={() => setShowModalCmt(true)}
                    disabled={!auth.isLoggedIn || isDisabledComment()}
                  >
                    <img
                      className={styles.iconEdit}
                      alt="ic"
                      src="/icons/ic-edit.svg"
                    />
                    スポットメモリーを書く
                  </CustomButton>
                </div>
              </div>
            )}
            {spotCmt?.length > 0 && (
              <List
                className={size(spotCmt) > 0 ? styles.list : styles.listNoData}
                itemLayout="vertical"
                pagination={{
                  pageSize: 5
                }}
                dataSource={spotCmt}
                renderItem={(item, index) => (
                  <ReviewItem
                    item={item}
                    key={index}
                    onSuccess={fetchSpotComment}
                    type={COMMENT_TYPE.EDIT}
                    isSpot
                  />
                )}
                // locale={{ emptyText: "データがありません。" }}
              />
            )}
          </div>

          {isMobile &&
            isCheckinQrCode &&
            isNotExpired(rallyInfo?.start_date, rallyInfo?.end_date) && (
              <ScannerQrCodeButton onClick={() => setShowModalScanner(true)} />
            )}

          {!isEmpty(spotDetail) &&
            isNotExpired(rallyInfo?.start_date, rallyInfo?.end_date) && (
              <CheckInSpot
                spotCheckinId={id}
                fetchSpotComment={fetchSpotComment}
                spotDetail={spotDetail}
                isSpotDetail
                callback={fetchSpotDetail}
                rallyName={rallyInfo?.name}
                isCheckin={isCheckin}
                isCheckinQrCode={isCheckinQrCode}
              />
            )}

          <ErrorCheckInModal
            visible={showModalErr}
            hideModal={() => setShowModalErr(false)}
          />
          <SpotMemoryModal
            visible={showModalCmt}
            hideModal={() => setShowModalCmt(false)}
            spotId={id}
            onFinish={fetchSpotComment}
            type={COMMENT_TYPE.SPOT}
            isSpot
          />
        </div>

        <ScannerQrCodeModal
          visible={showModalScanner}
          onClose={() => setShowModalScanner(false)}
        />

        <CouponSampleModal
          visible={showModalSample}
          onClose={() => setShowModalSample(false)}
        />
      </Spin>
    </>
  );
};

export default RallySpotDetailContainer;

/* eslint-disable no-lonely-if */
import CouponCheckInModal from "@components/Coupon/CouponCheckInModal";
import CheckInModal from "@components/Rally/Modal/CheckInModal";
import CheckinOneTimeModal from "@components/Rally/Modal/CheckinOneTimeModal";
import CompletedModal from "@components/Rally/Modal/CompletedModal";
import ErrorCheckInModal from "@components/Rally/Modal/ErrorCheckInModal";
import ErrorLoginModal from "@components/Rally/Modal/ErrorLoginModal";
import ErrorRangeModal from "@components/Rally/Modal/ErrorRangeModal";
import SpotListModal from "@components/Rally/Modal/SpotListModal";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { checkInSpotInGame, getSpotsCheckin } from "@services/game";
import { DATE_DOT } from "@utils/date";
import { isCanCheckIn } from "@utils/helper";
import usePosition from "hooks/usePosition";
import { find, get, head } from "lodash";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const CheckInSpot = ({
  gameId,
  callback = () => {},
  isSpotDetail,
  spotCheckinId,
  fetchSpotComment = () => {},
  spotDetail,
  rallyName,
  isCheckin,
  isCheckinQrCode
}) => {
  const [isOpenModalErrLogin, setIsOpenModalErrLogin] = useState(false);
  const [isOpenSpotListModal, setIsOpenSpotListModal] = useState(false);
  const [spotData, setSpotData] = useState([]);
  const [isOpenCheckinOneTimeModal, setIsOpenCheckinOneTimeModal] =
    useState(false);

  const [spots, setSpots] = useState([]);

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const { lat, lng, locationLoading } = usePosition();
  const auth = useAuth();
  const router = useRouter();
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [showModalCmt, setShowModalCmt] = useState(false);
  const [showModalComplete, setShowModalComplete] = useState(false);
  const [certificate, setCertificate] = useState({});
  const [hasCertificate, setHasCertificate] = useState(false);
  const [showModalErr, setShowModalErr] = useState(false);
  const [showModalErrRange, setShowModalErrRange] = useState(false);
  const [hasSerieCertificate, setHasSerieCertificate] = useState(false);
  const [gameCertificate, setGameCertificate] = useState();
  const [spotCouponData, setSpotCouponData] = useState({});
  const [hasSpotCoupon, setHasSpotCoupon] = useState(false);
  const [isShowCoupon, setIsShowCoupon] = useState(false);
  const [isSerieCertificate, setIsSerieCertificate] = useState(false);

  const setCertification = checkInData => {
    const hasCertification =
      checkInData?.player_game_certificate ||
      checkInData?.player_serie_certificate;
    if (hasCertification) {
      setHasCertificate(true);
      if (checkInData?.player_serie_certificate) {
        setHasSerieCertificate(true);
        const data = {
          ...checkInData?.player_serie_certificate,
          coupon: checkInData?.player_serie_coupon_reward
        };
        setCertificate(data);
      } else {
        setCertificate({
          ...checkInData?.player_game_certificate,
          coupon: checkInData?.player_game_coupon_reward
        });
      }
      if (checkInData?.player_game_certificate) {
        const gameData = {
          ...checkInData?.player_game_certificate,
          coupon: checkInData?.player_game_coupon_reward
        };
        setGameCertificate(gameData);
      }
    } else {
      setHasCertificate(false);
      setCertificate({});
    }
  };

  const onHideCompletedModal = () => {
    setShowModalComplete(false);
    setIsSerieCertificate(false);
    if (hasSerieCertificate) {
      setIsSerieCertificate(true);
      setCertificate(gameCertificate);
      setShowModalComplete(true);
      setHasSerieCertificate(false);
    }
  };

  const onCheckinOneSpot = async (checkinSpotId, spotInfo) => {
    try {
      showLoadingAnim();
      if ((lat, lng, checkinSpotId)) {
        const params = {
          user_point_lat: lat,
          user_point_lng: lng,
          spot_id: checkinSpotId
        };
        const checkInData = await checkInSpotInGame(params);
        if (!isSpotDetail) {
          const spotDetailInfo =
            find(spotData, { id: checkinSpotId }) || spotInfo;
          if (spotDetailInfo) {
            const info = {
              spotId: checkinSpotId,
              name: spotDetailInfo?.name,
              latest_checked_in_at: moment().tz("Asia/Tokyo").format(DATE_DOT),
              n_of_times_user_checked_in:
                spotDetailInfo?.n_of_times_user_checked_in + 1,
              rallyName
            };
            setInfoSuccess(info);
          }
        } else {
          const info = {
            spotId: checkinSpotId,
            name: spotDetail?.name,
            latest_checked_in_at: moment().tz("Asia/Tokyo").format(DATE_DOT),
            n_of_times_user_checked_in:
              spotDetail?.n_of_times_user_checked_in + 1,
            rallyName
          };
          setInfoSuccess(info);
        }
        setIsOpenSpotListModal(false);
        setShowModalCmt(true);
        callback();
        setCertification(checkInData);
        if (checkInData?.player_spot_coupon_reward) {
          setSpotCouponData(checkInData?.player_spot_coupon_reward);
          setHasSpotCoupon(true);
        } else {
          setHasSpotCoupon(false);
        }
      }
    } catch (error) {
      if (isSpotDetail) {
        setShowModalErrRange(true);
      }
    } finally {
      hideLoadingAnim();
    }
  };

  const getSpotsListCheckin = async () => {
    try {
      if (lat && lng) {
        showLoadingAnim();
        const params = {
          user_point_lat: lat,
          user_point_lng: lng
        };
        const response = await getSpotsCheckin(gameId, params);
        setSpotData(response);
        if (response?.length > 0) {
          const spotList = response?.filter(el =>
            isCanCheckIn(el?.latest_checked_in_at)
          );
          if (spotList?.length > 0) {
            setSpots(spotList);
            if (spotList?.length === 1) {
              const spotId = get(spotList, "[0].id");
              const spotInfo = head(spotList);
              onCheckinOneSpot(spotId, spotInfo);
            } else {
              setIsOpenSpotListModal(true);
            }
          } else {
            setIsOpenCheckinOneTimeModal(true);
          }
        } else {
          setShowModalErrRange(true);
        }
      } else {
        setShowModalErr(true);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const goToLogin = () => {
    router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    setIsOpenModalErrLogin(false);
  };

  const onHideModalSpotList = () => {
    setIsOpenSpotListModal(false);
  };

  const onCheckInDetail = () => {
    if (
      spotDetail?.latest_checked_in_at &&
      !isCanCheckIn(spotDetail?.latest_checked_in_at)
    ) {
      setIsOpenCheckinOneTimeModal(true);
    } else {
      onCheckinOneSpot(spotCheckinId);
    }
  };

  const onCheckin = () => {
    if (auth.isLoggedIn) {
      if (isSpotDetail) {
        onCheckInDetail();
      } else {
        if (lat && lng) {
          getSpotsListCheckin();
        } else {
          setShowModalErr(true);
        }
      }
    } else setIsOpenModalErrLogin(true);
  };

  const onCloseCouponModal = () => {
    setIsShowCoupon(false);
    if (hasCertificate) {
      setShowModalComplete(true);
    }
  };

  useEffect(() => {
    if (isCheckin && isCheckinQrCode && lat && lng) {
      onCheckin();
    }
  }, [isCheckin, isCheckinQrCode, lat, lng]);

  return (
    <>
      {!isCheckin && !isCheckinQrCode && !locationLoading && (
        <div className={styles.btnParticipation} onClick={onCheckin}>
          <img
            src="/img/rally/check-in-btn.svg"
            alt="img-participation"
            className={styles.imgParticipation}
          />
        </div>
      )}
      <ErrorLoginModal
        visible={isOpenModalErrLogin}
        hideModal={() => setIsOpenModalErrLogin(false)}
        goToLogin={goToLogin}
      />
      <CheckinOneTimeModal
        visible={isOpenCheckinOneTimeModal}
        hideModal={() => setIsOpenCheckinOneTimeModal(false)}
      />
      <SpotListModal
        spots={spots}
        visible={isOpenSpotListModal}
        hideModal={onHideModalSpotList}
        onCheckinOneSpot={onCheckinOneSpot}
      />
      <CheckInModal
        visible={showModalCmt}
        hideModal={() => setShowModalCmt(false)}
        infoSuccess={infoSuccess}
        callback={fetchSpotComment}
        hasCertificate={hasCertificate}
        hasCoupon={hasSpotCoupon}
        showModalComplete={() => setShowModalComplete(true)}
        showCouponModal={() => setIsShowCoupon(true)}
      />
      <CompletedModal
        visible={showModalComplete}
        isSerieCertificate={isSerieCertificate}
        hideModal={onHideCompletedModal}
        certificate={certificate}
      />
      <ErrorCheckInModal
        visible={showModalErr}
        hideModal={() => setShowModalErr(false)}
      />
      <ErrorRangeModal
        visible={showModalErrRange}
        hideModal={() => setShowModalErrRange(false)}
        isSpotDetail={isSpotDetail}
      />
      <CouponCheckInModal
        visible={isShowCoupon}
        couponData={spotCouponData}
        spotData={infoSuccess}
        onClose={onCloseCouponModal}
      />
    </>
  );
};

export default CheckInSpot;

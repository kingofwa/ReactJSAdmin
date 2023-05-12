import { useRouter } from "next/router";
import { Button, message } from "antd";
import UseCouponModal from "@components/Coupon/UseCouponModal";
import { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { DATE_DOT } from "@utils/date";
import { applyCoupon, getCouponDetail } from "@services/coupon";
import { LoaderContext } from "@contexts/loader";
import styles from "./Styles.module.scss";

const CouponDetailContainer = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchCouponDetail = async () => {
    try {
      showLoadingAnim();
      const response = await getCouponDetail(id);
      setData(response);
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (id) {
      fetchCouponDetail();
    }
  }, [id]);

  const onUseCoupon = async () => {
    try {
      await applyCoupon(id);
      fetchCouponDetail();
    } catch (error) {
      message.error(error);
    }
  };

  const renderAction = () => {
    if (!data?.is_expired) {
      return (
        <div className={styles.actions}>
          <Button
            size="middle"
            className={
              data?.is_available ? styles.useCoupon : styles.useCouponDisabled
            }
            onClick={() => setShowModal(true)}
            disabled={!data?.is_available}
          >
            {data?.is_available ? "クーポンを利用する" : "クーポン利用済み"}
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.header}>
        <div onClick={() => router.back()}>
          <img
            src="/icons/ic-back.svg"
            alt="ic-back"
            className={styles.icBack}
          />
        </div>
        <p className={styles.rallyName}>
          {data?.from?.source?.game_name ||
            data?.from?.source?.serie_name ||
            data?.from?.name}
        </p>
      </div>
      <div className={styles.title}>獲得報酬</div>
      <div className={styles.content}>
        <div className={styles.couponTitle}>{data?.from?.name}</div>
        <div className={styles.couponTitle}>
          {data?.received_from_type === "Spot"
            ? "チェックイン報酬"
            : "制覇報酬"}
        </div>
        {data.image_url && (
          <div className={styles.couponImage}>
            <img src={data.image_url} alt="couponImage" />
          </div>
        )}
        <div className={styles.couponInfo}>
          <p className={styles.couponInfoTitle}>{data?.name}</p>
          <div className={styles.couponInfoDesc}>{data?.description}</div>
          <div className={styles.couponInfoRow}>
            利用可能回数：
            {data?.limit_number_of_times_of_use_per_sheet
              ? `${data?.limit_number_of_times_of_use_per_sheet}回`
              : "無制限"}
          </div>
          <div className={styles.couponInfoRow}>
            利用期限：
            {moment(data?.expiration_date).tz("Asia/Tokyo").format(DATE_DOT)}
          </div>
          {renderAction()}
        </div>
      </div>
      <UseCouponModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onUseCoupon={onUseCoupon}
        data={data}
      />
    </>
  );
};

export default CouponDetailContainer;

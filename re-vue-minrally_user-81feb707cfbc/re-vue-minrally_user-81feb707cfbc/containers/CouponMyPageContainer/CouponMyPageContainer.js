import ListCoupon from "@components/Coupon/ListCoupon";
import { getListCoupon } from "@services/coupon";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const CouponMyPageContainer = () => {
  const [couponSpot, setCouponSpot] = useState();
  const [couponSpotMeta, setCouponSpotMeta] = useState();
  const [couponSpotLoading, setCouponSpotLoading] = useState(false);

  const [couponFinnish, setCouponFinnish] = useState();
  const [couponFinnishMeta, setCouponFinnishMeta] = useState();
  const [couponFinnishLoading, setCouponFinnishLoading] = useState(false);

  const fetchListCouponsSpot = async (page = 1) => {
    try {
      setCouponSpotLoading(true);
      const params = { page, per: 5, from_type: "spot" };
      const response = await getListCoupon(params);
      setCouponSpot(response?.data);
      setCouponSpotMeta(response?.meta);
    } catch (error) {
      // message.error(error);
    } finally {
      setCouponSpotLoading(false);
    }
  };

  const fetchListCouponsFinnish = async (page = 1) => {
    try {
      setCouponFinnishLoading(true);
      const params = { page, per: 5, from_type: "serie,game" };
      const response = await getListCoupon(params);
      setCouponFinnish(response?.data);
      setCouponFinnishMeta(response?.meta);
    } catch (error) {
      // message.error(error);
    } finally {
      setCouponFinnishLoading(false);
    }
  };

  const handleChangePageSpot = page => {
    fetchListCouponsSpot(page);
  };

  const handleChangeFinnish = page => {
    fetchListCouponsFinnish(page);
  };

  useEffect(() => {
    fetchListCouponsSpot();
    fetchListCouponsFinnish();
  }, []);

  return (
    <div className={styles.CouponMyPageContainer}>
      <ListCoupon
        title="チェックイン報酬"
        data={couponSpot}
        meta={couponSpotMeta}
        handleChangePage={handleChangePageSpot}
        loading={couponSpotLoading}
        showRallyName
        showReceivedName
      />
      <ListCoupon
        title="制覇報酬"
        data={couponFinnish}
        meta={couponFinnishMeta}
        handleChangePage={handleChangeFinnish}
        loading={couponFinnishLoading}
        showReceivedName
      />
    </div>
  );
};

export default CouponMyPageContainer;

import ListCoupon from "@components/Coupon/ListCoupon";
import { getListCoupon } from "@services/coupon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Styles.module.scss";

const RallyCouponContainer = ({ gameData }) => {
  const router = useRouter();
  const id = router?.query?.id;

  const [couponList, setCouponList] = useState();
  const [couponMeta, setCouponMeta] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [couponFinnish, setCouponFinnish] = useState();
  const [couponFinnishMeta, setCouponFinnishMeta] = useState();
  const [couponFinnishLoading, setCouponFinnishLoading] = useState(false);

  const fetchListCoupons = async (page = 1) => {
    try {
      setIsLoading(true);
      const params = { page, per: 5, from_type: "spot", rally_id: id };
      const response = await getListCoupon(params);
      setCouponList(response?.data);
      setCouponMeta(response?.meta);
    } catch (error) {
      // message.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchListCouponsFinnish = async (page = 1) => {
    try {
      setCouponFinnishLoading(true);
      const params = { page, per: 5, received_from_id: id };
      const response = await getListCoupon(params);
      setCouponFinnish(response?.data);
      setCouponFinnishMeta(response?.meta);
    } catch (error) {
      // message.error(error);
    } finally {
      setCouponFinnishLoading(false);
    }
  };

  const onChangeFinnish = page => {
    fetchListCouponsFinnish(page);
  };

  const onChangePage = page => {
    fetchListCoupons(page);
  };

  useEffect(() => {
    if (id) {
      fetchListCoupons();
      fetchListCouponsFinnish();
    }
  }, [id]);

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
        <p className={styles.rallyName}>{gameData?.name}</p>
      </div>
      <div className={styles.title}>獲得報酬一覧</div>
      <div className={styles.content}>
        <ListCoupon
          title="チェックイン報酬"
          data={couponList}
          meta={couponMeta}
          handleChangePage={onChangePage}
          loading={isLoading}
        />

        <ListCoupon
          title="制覇報酬"
          data={couponFinnish}
          meta={couponFinnishMeta}
          handleChangePage={onChangeFinnish}
          loading={couponFinnishLoading}
        />
      </div>
    </>
  );
};

export default RallyCouponContainer;

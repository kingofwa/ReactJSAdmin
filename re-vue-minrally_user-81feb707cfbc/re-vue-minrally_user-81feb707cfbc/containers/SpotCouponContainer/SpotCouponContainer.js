import ListCoupon from "@components/Coupon/ListCoupon";
import { getListCoupon } from "@services/coupon";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Styles.module.scss";

const SpotCouponContainer = ({ spotDetail }) => {
  const router = useRouter();
  const id = router?.query?.id;

  const [couponFinnish, setCouponFinnish] = useState();
  const [couponFinnishMeta, setCouponFinnishMeta] = useState();
  const [couponFinnishLoading, setCouponFinnishLoading] = useState(false);

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

  useEffect(() => {
    if (id) {
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
        <p className={styles.rallyName}>{spotDetail?.name}</p>
      </div>
      <div className={styles.title}>獲得報酬一覧</div>
      <div className={styles.content}>
        <ListCoupon
          title="チェックイン報酬"
          data={couponFinnish}
          meta={couponFinnishMeta}
          handleChangePage={onChangeFinnish}
          loading={couponFinnishLoading}
        />
      </div>
    </>
  );
};

export default SpotCouponContainer;

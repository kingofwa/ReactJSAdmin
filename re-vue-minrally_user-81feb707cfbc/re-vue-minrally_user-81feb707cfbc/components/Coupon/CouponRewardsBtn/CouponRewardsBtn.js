import styles from "./Styles.module.scss";

const CouponRewardsBtn = ({
  title = "未利用の報酬があります",
  onClick = () => {}
}) => {
  return (
    <div className={styles.CouponWrapper} onClick={onClick}>
      <div className={styles.Coupon}>{title}</div>
    </div>
  );
};

export default CouponRewardsBtn;

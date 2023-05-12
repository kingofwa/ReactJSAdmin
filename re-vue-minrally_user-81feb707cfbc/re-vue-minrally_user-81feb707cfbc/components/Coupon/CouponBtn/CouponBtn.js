import styles from "./Styles.module.scss";

const CouponBtn = ({ onClick = () => {} }) => {
  return (
    <div className={styles.CouponBtn} onClick={onClick}>
      獲得報酬一覧
    </div>
  );
};

export default CouponBtn;

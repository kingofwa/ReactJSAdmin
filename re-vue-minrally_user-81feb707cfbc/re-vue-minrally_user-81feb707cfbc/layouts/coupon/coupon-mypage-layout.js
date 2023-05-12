import Footer from "@components/common/footer";
import HeaderBack from "@components/common/header/HeaderBack";
import withPrivateRoute from "@routes/withPrivaterRoute";
import styles from "./styles.module.scss";

const CouponMyPageLayout = ({ children }) => {
  return (
    <>
      <div className="default-container">
        <HeaderBack title="獲得報酬一覧" />
        <div className={styles.Container}>
          <section className={styles.Content}>{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default withPrivateRoute(CouponMyPageLayout);

import Footer from "@components/common/footer";
import withPrivateRoute from "@routes/withPrivaterRoute";
import styles from "./styles.module.scss";

const CouponGrandLayout = ({ children }) => {
  return (
    <>
      <div className="default-container">
        <div className={styles.ContainerGrand}>
          <section className={styles.Content}>{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default withPrivateRoute(CouponGrandLayout);

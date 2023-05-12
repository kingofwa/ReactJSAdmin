import Footer from "@components/common/footer";
// import Copyright from "@components/common/footer/Copyright";
import Header from "@components/common/header";
import withPrivateRoute from "@routes/withPrivaterRoute";
import styles from "./styles.module.scss";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.mainLayout}>
        <div className={styles.container}>{children}</div>
        {/* <BackToTop /> */}
        {/* <Copyright /> */}
      </div>
      <Footer />
    </>
  );
};

export default withPrivateRoute(PrivateLayout);

import Footer from "@components/common/footer";
import styles from "./styles.module.scss";

const OnlyFooterLayout = ({ children }) => {
  return (
    <>
      <div className="only-footer-container">
        <div className={styles.onlyFooterLayout}>
          <div className={styles.container}>{children}</div>
        </div>
        <Footer />
      </div>
      <div className="main-background" />
    </>
  );
};

export default OnlyFooterLayout;

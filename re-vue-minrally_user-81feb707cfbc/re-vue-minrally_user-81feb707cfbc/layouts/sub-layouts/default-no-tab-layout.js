// eslint-disable-next-line import/no-unresolved
import Footer from "@components/common/footer";
import Header from "@components/common/header";
// import styles from "../styles.module.scss";

const DefaultNoTabLayout = ({ children }) => {
  return (
    <>
      <div className="default-container" id="scrollableDiv">
        <div className="default-no-tab-container">
          <Header />
          <section className="no-tab-container-content">{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default DefaultNoTabLayout;

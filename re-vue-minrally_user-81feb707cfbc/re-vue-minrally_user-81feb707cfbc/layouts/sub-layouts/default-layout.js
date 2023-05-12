// eslint-disable-next-line import/no-unresolved
import Footer from "@components/common/footer";
import Header from "@components/common/header";
import HeaderMenu from "@components/common/header/HeaderMenu";
import { TOP_MENU } from "@config/constants";
// import styles from "../styles.module.scss";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="default-container" id="scrollableDiv">
        <div className="default-body">
          <Header />
          <HeaderMenu menus={TOP_MENU} />
          <section className="default-container-content">{children}</section>
          <Footer />
        </div>
      </div>
      <div className="main-background" />
    </>
  );
};

export default DefaultLayout;

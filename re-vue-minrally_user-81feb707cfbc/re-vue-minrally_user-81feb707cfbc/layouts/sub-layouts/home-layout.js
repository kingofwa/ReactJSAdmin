import HeaderMenu from "@components/common/header/HeaderMenu";
import { TOP_MENU } from "@config/constants";
import styles from "../styles.module.scss";

const HomeLayout = ({ children }) => {
  return (
    <>
      <HeaderMenu menus={TOP_MENU} />
      <section className="home-section">
        <div className={styles.main}>{children}</div>
      </section>
    </>
  );
};

export default HomeLayout;

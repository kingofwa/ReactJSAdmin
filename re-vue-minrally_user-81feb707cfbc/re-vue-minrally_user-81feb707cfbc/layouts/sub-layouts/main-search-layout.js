import HeaderMenu from "@components/common/header/HeaderMenu";
import { SEARCH_MENU } from "@config/constants";
import styles from "../styles.module.scss";

const MainSearchLayout = ({ children }) => {
  return (
    <>
      <HeaderMenu menus={SEARCH_MENU} />
      <section className="home-section">
        <div className={styles.main}>{children}</div>
      </section>
    </>
  );
};

export default MainSearchLayout;

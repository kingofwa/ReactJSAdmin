import HeaderMenu from "@components/common/header/HeaderMenu";
import { NEWS_MENU } from "@config/constants";
import styles from "../styles.module.scss";

const NewsLayout = ({ children }) => {
  return (
    <>
      <HeaderMenu menus={NEWS_MENU} />
      <section className="home-section">
        <div className={styles.main}>{children}</div>
      </section>
    </>
  );
};

export default NewsLayout;

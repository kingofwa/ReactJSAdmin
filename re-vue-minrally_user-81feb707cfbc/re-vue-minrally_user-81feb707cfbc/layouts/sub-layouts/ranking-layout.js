import HeaderMenu from "@components/common/header/HeaderMenu";
import { TOP_MENU } from "@config/constants";
import styles from "../styles.module.scss";

const RankingLayout = ({ children }) => {
  return (
    <>
      <section className={styles.rankingContainer}>
        <HeaderMenu menus={TOP_MENU} />
        <div className={styles.contentRanking}>{children}</div>
      </section>
    </>
  );
};

export default RankingLayout;

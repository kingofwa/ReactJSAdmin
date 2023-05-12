import { map } from "lodash";
import PATHS from "@config/paths";
import Link from "next/link";
import { RANKING_TAB } from "@config/constants";
import { RANKING_RALLY_FILTER } from "@utils/constants";
import styles from "./RankingTab.module.scss";

const tabs = [
  {
    label: "グランドラリー",
    path: `${PATHS.rankingGrandRally}?type=${RANKING_RALLY_FILTER.checkedCount}`,
    id: RANKING_TAB.GRAND_RALLY
  },
  {
    label: "ラリー",
    path: `${PATHS.rankingRally}?type=${RANKING_RALLY_FILTER.checkedCount}`,
    id: RANKING_TAB.RALLY
  },

  {
    label: "プレイヤー",
    path: PATHS.rankingUser,
    id: RANKING_TAB.USER
  },
  {
    label: "ラリーマスター",
    path: PATHS.rankingCreator,
    id: RANKING_TAB.CREATOR
  }
];

const RankingTab = ({ active }) => {
  return (
    <>
      <ul className={styles.tab}>
        {map(tabs, (tab, index) => {
          const isActive = active === tab.id;
          return (
            <li
              className={isActive ? styles.itemActive : styles.item}
              key={index}
            >
              <Link href={tab.path}>
                <a>{tab.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RankingTab;

import PATHS from "@config/paths";
import { DATE_DEFAULT } from "@utils/date";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../style.module.scss";

const PARTI_STATUS_CONST = {
  completed: "制覇",
  notCompleted: "未制覇"
};

const PlayingGrandItem = ({ item }) => {
  const isCompleted = item.my_status === PARTI_STATUS_CONST.completed;
  const router = useRouter();
  const goToDetail = () => {
    router.push({
      pathname: PATHS.series,
      query: { id: item.id }
    });
  };
  return (
    <div className={styles.partiItem}>
      <div className={styles.title}>
        <span
          className={`${styles.tag} ${isCompleted ? styles.completed : ""}`}
        >
          {isCompleted
            ? PARTI_STATUS_CONST.completed
            : PARTI_STATUS_CONST.notCompleted}
        </span>
        <span onClick={goToDetail} className={styles.grandName}>
          <img
            src="/icons/ic-copy.svg"
            alt="ic-copy"
            className={styles.imgCopy}
          />
          {item?.name}
        </span>
      </div>
      <div className={styles.desc}>
        <div>
          達成ラリー
          <span onClick={goToDetail} className={styles.cursorPointer}>
            {item?.my_achievement}
          </span>
        </div>
        <div onClick={goToDetail} className={styles.cursorPointer}>
          最終チェックイン
          <span>
            {item?.my_last_checkin_at
              ? moment(item?.my_last_checkin_at).format(DATE_DEFAULT)
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayingGrandItem;

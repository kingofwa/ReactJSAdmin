import { DATE_DOT } from "@utils/date";
import moment from "moment";
import styles from "./style.module.scss";

const CheckinHistoryItem = ({ item }) => {
  return (
    <div className={styles.historyItem}>
      <div className={styles.content}>
        <div className={styles.date}>
          {moment(item?.created_at).format(DATE_DOT)}
        </div>
        <span className={styles.textLink}>{item?.game?.name}</span>の
        <span className={styles.textLink}>{item?.spot?.name}</span>
        にチェックインしました！
      </div>
    </div>
  );
};

export default CheckinHistoryItem;

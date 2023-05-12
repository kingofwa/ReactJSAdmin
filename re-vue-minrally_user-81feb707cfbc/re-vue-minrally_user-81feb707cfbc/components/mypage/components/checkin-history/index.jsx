import PATHS from "@config/paths";
import Link from "next/link";
import CheckinHistoryItem from "./CheckinHistoryItem";
import styles from "./style.module.scss";

const CheckinHistoryList = ({ isShowALl, checkinHistory }) => {  
  return (
    <>
      <div className={styles.history}>
        <div className={styles.historyList}>
          {checkinHistory?.map(item => (
            <CheckinHistoryItem item={item} key={item.id} />
          ))}
        </div>
        {!isShowALl && checkinHistory?.length !== 0 && (
          <Link href={`${PATHS.mypagePlayer}${PATHS.checkinHistory}`}>
            <a className={styles.btnShowAll}>続きを見る</a>
          </Link>
        )}
      </div>
    </>
  );
};

export default CheckinHistoryList;

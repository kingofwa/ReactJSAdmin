import PATHS from "@config/paths";
import { useRouter } from "next/router";
import React from "react";
import styles from "./styles.module.scss";

function History({ footprints, id }) {
  const router = useRouter();
  const onGoCompletePage = () => {
    router.push({
      pathname: PATHS.seriesComplete,
      query: { id }
    });
  };

  const onSeriesFastest = () => {
    const url = PATHS.seriFastestFinishTime.replace(/:id/, id);
    router.push(url);
  };

  const onSeriesTimesCompleted = () => {
    const url = PATHS.seriNumberOfTimesCompleted.replace(/:id/, id);
    router.push(url);
  };
  // const footprints = {
  //   completion_count_ranking: 2,
  //   completion_record: 3,
  //   completion_speed_ranking: 2,
  //   fastest_finish_time: 2,
  //   fastest_finish_time_string: 1
  // };

  return (
    <div className={styles.history}>
      <div className={styles.historyTitle}>
        <span>これまでの足跡</span>
      </div>
      <div className={styles.historyRow}>
        <p className={styles.historyLabel}>制覇記録</p>
        <p className={styles.historyInfo}>{footprints?.completion_record}回</p>
        {footprints?.completion_record !== 0 && (
          <div onClick={onGoCompletePage} className={styles.goDetail}>
            <img
              src="/icons/ic-go-detail.svg"
              alt="ic-go-detail"
              className={styles.icGoDetail}
            />
          </div>
        )}
      </div>
      <div className={styles.historyRow}>
        <p className={styles.historyLabel}>最速制覇時間</p>
        <p className={styles.historyInfo}>
          {footprints?.fastest_finish_time_string
            ? footprints?.fastest_finish_time_string
            : "記録なし"}
        </p>
      </div>
      <div className={styles.historyRow}>
        <p className={styles.historyLabel}>制覇速度ランキング</p>
        <p className={styles.historyInfo}>
          {footprints?.completion_speed_ranking ? (
            <span className={styles.hightLight} onClick={onSeriesFastest}>
              {footprints?.completion_speed_ranking}位
            </span>
          ) : (
            <span className={styles.historyInfo}>記録なし</span>
          )}
        </p>
      </div>
      <div className={styles.historyRow}>
        <p className={styles.historyLabel}>制覇回数ランキング</p>
        <p className={styles.historyInfo}>
          {footprints?.completion_count_ranking ? (
            <span
              className={styles.hightLight}
              onClick={onSeriesTimesCompleted}
            >
              {footprints?.completion_count_ranking}位
            </span>
          ) : (
            <span className={styles.historyInfo}>記録なし</span>
          )}
        </p>
      </div>
    </div>
  );
}

export default History;

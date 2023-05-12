import { DATE_DOT, TIME_DOT, DATE_NIHON } from "@utils/date";
import moment from "moment-timezone";
import { useState } from "react";
import styles from "./CompleteItem.module.scss";

const CompleteItem = ({ history, index }) => {
  const [collapse, setCollapse] = useState(false);

  const onClickCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <div className={styles.completeItem}>
        <div className={styles.title} onClick={onClickCollapse}>
          <span>{index}回目</span>
          <span>
            {moment(history?.created_at).tz("Asia/Tokyo").format(DATE_DOT)}
          </span>
          <span>
            {moment(history?.created_at).tz("Asia/Tokyo").format(TIME_DOT)}
          </span>

          {/* TODO: Update version */}
          {/* <span>（Ver.1.0）</span> */}
          <div className={styles.collapse}>
            {collapse ? (
              <img
                src="/icons/ic-up.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            ) : (
              <img
                src="/icons/ic-down.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            )}
          </div>
        </div>
        {collapse && (
          <div className={styles.content}>
            <div className={styles.row}>
              <p className={styles.label}>制覇日時</p>
              <span className={styles.info}>
                {moment(history?.created_at).tz("Asia/Tokyo").format(DATE_DOT)}
              </span>
              <span className={styles.info}>
                {moment(history?.created_at).tz("Asia/Tokyo").format(TIME_DOT)}
              </span>
            </div>

            <div className={styles.row}>
              <p className={styles.label}>制覇タイム</p>
              <span className={styles.info}>{history?.finish_time_string}</span>
            </div>
            <div className={styles.certificate}>
              <img src="/img/certificate-bg.png" alt="bg" />
              <p className={styles.certificateTitle}>
                {history?.certificate?.name}
              </p>
              <p className={styles.certificateSubTitle}>
                {history?.certificate?.game_name}
                <br />
                {history?.certificate?.player_name}
              </p>
              <p className={styles.certificateDescription}>
                {history?.certificate?.description} <br />
                <span>
                  {moment(history?.certificate?.finished_at)
                    .tz("Asia/Tokyo")
                    .format(DATE_NIHON)}{" "}
                  {moment(history?.certificate?.finished_at)
                    .tz("Asia/Tokyo")
                    .format(TIME_DOT)}
                </span>
              </p>
              <p className={styles.certificateSubDescription}>
                あなたは、{history?.certificate?.game_name}
                を制覇いたしましたことをここに表彰いた します。
              </p>
              <p className={styles.certificateContent}>
                {moment(history?.certificate?.finished_at)
                  .tz("Asia/Tokyo")
                  .format(DATE_NIHON)}
                <br />
                {history?.certificate?.game_name}
                <br /> {history?.certificate?.owner_name}
              </p>
              <p className={styles.certificateNo}>
                No.{history?.certificate?.cert_no}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompleteItem;

import { viewNotification } from "@services/notifications";
import { DATE_DOT } from "@utils/date";
import moment from "moment";
import { useContext } from "react";
import { useAuth } from "@contexts/auth";
import { NotificationContext } from "@contexts/notification";
import styles from "./styles.module.scss";

const SystemNotification = ({ item, onUpdateNotice }) => {
  const { checkNotifications } = useContext(NotificationContext);
  const auth = useAuth();

  const onViewed = async () => {
    try {
      if (!item?.is_viewed) {
        await viewNotification(item?.id);
        checkNotifications();
      }
      onUpdateNotice(item?.id);
    } catch (error) {
      //
    }
  };

  const renderKind = () => {
    const { kind } = item;
    if (kind === "system") {
      return <p className={styles.player}>システム</p>;
    }
    if (kind === "campaign") {
      return <p className={styles.creator}>キャンペーン</p>;
    }
    if (kind === "player") {
      return <p className={styles.player}>プレイヤー</p>;
    }
    if (kind === "rally_master") {
      return <p className={styles.creator}>ラリーマスター</p>;
    }
    if (kind === "other") {
      return <p className={styles.other}>その他</p>;
    }
    return null;
  };

  return (
    <>
      <div
        className={
          item?.is_viewed || !auth.isLoggedIn
            ? styles.newsItemViewed
            : styles.newsItem
        }
      >
        <div className={styles.info}>
          <div className={styles.row}>
            <p className={styles.date}>
              {moment(item?.created_at).format(DATE_DOT)}
            </p>
            {renderKind()}
          </div>
          <div className={styles.rowTitle} onClick={onViewed}>
            <p className={styles.title}>{item?.title}</p>
            <div className={styles.collapse}>
              {item?.is_collapse ? (
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
        </div>
        {item?.is_collapse && (
          <div className={styles.content}>{item?.content}</div>
        )}
      </div>
    </>
  );
};

export default SystemNotification;

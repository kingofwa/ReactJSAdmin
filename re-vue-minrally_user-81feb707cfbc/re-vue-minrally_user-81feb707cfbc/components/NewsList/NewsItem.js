import { vieUserNotification, viewNotification } from "@services/notifications";
import { DATE_DOT } from "@utils/date";
import moment from "moment";
import { useEffect, useState } from "react";
import { useAuth } from "@contexts/auth";
import styles from "./NewsList.module.scss";

const NewsItem = ({ item, isUser }) => {
  const auth = useAuth();
  const [collapse, setCollapse] = useState(false);
  const [firstClickView, setFirstClickView] = useState(false);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    setViewed(item?.is_viewed);
  }, []);

  const onViewed = async () => {
    try {
      setViewed(true);
      if (auth.isLoggedIn) {
        if (isUser) {
          await vieUserNotification(item?.id);
        } else {
          await viewNotification(item?.id);
        }
      }
    } catch (error) {
      //
    }
  };

  const onClickCollapse = () => {
    if (!firstClickView && !viewed) {
      onViewed();
      setFirstClickView(true);
    }
    setCollapse(!collapse);
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
      <div className={viewed ? styles.newsItemViewed : styles.newsItem}>
        <div className={styles.info}>
          <div className={styles.row}>
            <p className={styles.date}>
              {moment(item?.created_at).format(DATE_DOT)}
            </p>
            {renderKind()}
          </div>
          <div className={styles.rowTitle} onClick={onClickCollapse}>
            <p className={styles.title}>{item?.title}</p>
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
        </div>
        {collapse && <div className={styles.content}>{item?.content}</div>}
      </div>
    </>
  );
};

export default NewsItem;

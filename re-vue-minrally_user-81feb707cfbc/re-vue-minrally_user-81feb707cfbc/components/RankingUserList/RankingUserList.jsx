import styles from "./RankingUserList.module.scss";

const RankingUserList = () => {
  const renderUserItem = index => {
    return (
      <div className={styles.userItem}>
        {index < 4 ? (
          <div className={styles.ranking}>
            <img
              src={`/icons/ic-rank-${index}.svg`}
              alt="ranking"
              className={styles.rankIcon}
            />
            <span className={styles.rank}>{index}</span>
          </div>
        ) : (
          <span className={styles.ranking}>{index}位</span>
        )}
        <div className={styles.avatar}>
          <img alt="avatar" src="/img/avatar.jpeg" />
        </div>
        <p className={styles.name}>プレイヤー名</p>
        <p className={styles.time}>500回</p>
      </div>
    );
  };

  return (
    <>
      <div className={styles.userList}>
        <div className={styles.info}>
          <p className={styles.title}>
            チェックイン数ランキング
            <img
              src="/icons/ic-info.svg"
              alt="ic-info"
              className={styles.icInfo}
            />
          </p>
          <p className={styles.seeMore}>もっと見る</p>
        </div>
        {renderUserItem(1)}
        {renderUserItem(2)}
        {renderUserItem(3)}
        {renderUserItem(4)}
        {renderUserItem(5)}
      </div>
    </>
  );
};

export default RankingUserList;

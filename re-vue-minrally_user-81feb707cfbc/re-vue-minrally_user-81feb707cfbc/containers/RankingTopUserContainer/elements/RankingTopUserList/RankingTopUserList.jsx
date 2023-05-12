/* eslint-disable no-plusplus */
import styles from "./RankingTopUserList.module.scss";

const RankingTopUserList = () => {
  const listData = [];
  for (let i = 1; i < 101; i++) {
    listData.push({
      id: i
    });
  }

  const renderUserItem = (item, index) => {
    const rank = index + 1;

    return (
      <div className={styles.userItem} key={item.id}>
        {rank < 4 ? (
          <div className={styles.ranking}>
            <img
              src={`/icons/ic-rank-${rank}.svg`}
              alt="ranking"
              className={styles.rankIcon}
            />
            <span className={styles.rank}>{rank}</span>
          </div>
        ) : (
          <span className={styles.ranking}>{rank}位</span>
        )}
        <div className={styles.avatar}>
          <img alt="avatar" src="/img/avatar-holder.svg" />
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
            <div>
              <img
                src="/icons/ic-back.svg"
                alt="ic-back"
                className={styles.icBack}
              />
            </div>
            チェックイン数ランキング TOP100
          </p>
          <p className={styles.seeMore}>自分の順位</p>
        </div>
        {listData.map((item, index) => {
          return renderUserItem(item, index);
        })}
      </div>
    </>
  );
};

export default RankingTopUserList;

import { List } from "antd";
import { size } from "lodash";
import { useEffect, useState } from "react";
import RallyItem from "./RallyItem";
import styles from "./styles.module.scss";

const RallyPlaying = ({ seriGames, handleChangePage, handleFavoriteGame }) => {
  const [gameFinished, setGameFinished] = useState(0);

  useEffect(() => {
    const count = seriGames?.data?.filter(el => el?.is_finished);
    setGameFinished(count?.length ?? 0);
  }, [seriGames]);

  return (
    <div className={styles.container}>
      <div className={styles.rallyListTitle}>
        <span>
          ラリーリスト(
          <b className={styles.hightLight}>{gameFinished}</b>/
          {seriGames?.meta?.count})
        </span>
      </div>
      <List
        className={size(seriGames?.data) > 0 ? styles.list : styles.listEmpty}
        itemLayout="vertical"
        pagination={
          !!seriGames?.data && {
            pageSize: 5,
            total: seriGames?.meta?.count,
            onChange: page => handleChangePage(page, "games")
          }
        }
        dataSource={seriGames?.data}
        renderItem={(item, index) => (
          <RallyItem
            rally={item}
            key={index}
            handleFavoriteGame={handleFavoriteGame}
          />
        )}
        // locale={{ emptyText: "データがありません。" }}
      />
    </div>
  );
};

export default RallyPlaying;

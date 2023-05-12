import { List } from "antd";
import { size } from "lodash";
import styles from "../../style.module.scss";
import PlayingItem from "./PlayingItem";

const PlayingGames = ({ playingGames }) => {
  return (
    <List
      // className={styles.list}
      className={size(playingGames) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      dataSource={playingGames}
      renderItem={(item, index) => <PlayingItem item={item} key={index} />}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default PlayingGames;

import { List } from "antd";
import { size } from "lodash";
import FollowerItem from "./FollowerItem";
import styles from "../style.module.scss";

const Followers = ({
  followers,
  handleUnFollow = () => {},
  handleFollow = () => {}
}) => {
  return (
    <List
      // className={styles.list}
      className={size(followers) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      dataSource={followers}
      renderItem={item => (
        <FollowerItem
          item={item}
          key={item?.id}
          handleUnFollow={handleUnFollow}
          handleFollow={handleFollow}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default Followers;

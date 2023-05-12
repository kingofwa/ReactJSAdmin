import { Avatar, Button, List } from "antd";
import styles from "../style.module.scss";

const FollowerItem = ({ item, handleFollowUser }) => {
  return (
    <List.Item
      className={styles.listItem}
      extra={
        item?.is_following ? (
          <Button className={`${styles.btnFollow} ${styles.active}`}>
            フォロー中
          </Button>
        ) : (
          <Button
            onClick={() => handleFollowUser(item.id)}
            className={styles.btnFollow}
          >
            フォローする
          </Button>
        )
      }
    >
      <Avatar
        className={styles.avatar}
        src={item?.avatar_url ?? "/img/mypage/avatar-default.png"}
      />
      {item.user_name}
    </List.Item>
  );
};

export default FollowerItem;

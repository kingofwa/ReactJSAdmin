import { Avatar, Button, List } from "antd";
import React from "react";
import styles from "./style.module.scss";

const CreatorItem = ({ item, handleFollowUser }) => {
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
        src={item?.avatar_url || "/img/avatar-holder.svg"}
      />
      {item?.user_name}
    </List.Item>
  );
};

export default CreatorItem;

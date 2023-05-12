import { Button } from "antd";
import React from "react";

import styles from "./style.module.scss";

const Follow = ({ follower, handleFollowUser }) => {
  return (
    <div className={styles.follow}>
      <div className={styles.info}>
        フォロワー
        <span className={styles.count}>{follower}人</span>
      </div>
      <Button onClick={handleFollowUser} className={styles.btnFollow}>
        フォローする
      </Button>
    </div>
  );
};

export default Follow;

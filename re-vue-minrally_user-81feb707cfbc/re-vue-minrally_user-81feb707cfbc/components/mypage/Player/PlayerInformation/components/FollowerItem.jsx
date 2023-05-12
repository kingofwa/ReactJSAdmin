/* eslint-disable no-nested-ternary */
import PATHS from "@config/paths";
import { Avatar, List } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/auth";
import RenderButtonFollow from "@components/ButtonFollow";

import styles from "../style.module.scss";

const FollowerItem = ({
  item
}) => {
  const router = useRouter();
  const goToDetail = () => {
    if (item?.is_creator) {
      router.push({
        pathname: PATHS.profileCreatorRally,
        query: { id: item.id }
      });
    } else {
      router.push({
        pathname: PATHS.profilePlayerRally,
        query: { id: item.id }
      });
    }
  };
  const auth = useAuth();
  const userMeId = auth?.user?.id;

  return (
    <List.Item
      className={styles.listItem}
      extra={
        userMeId !== item.id ? (
            <RenderButtonFollow profile={item} />
        ) : (
          <div />
        )
      }
    >
      <Avatar
        className={styles.avatar}
        src={item?.avatar_url || "/img/mypage/avatar-default.png"}
        onClick={goToDetail}
      />
      <div>
        <span className={styles.userName} onClick={goToDetail}>
          {item.user_name}
        </span>
        {item?.is_follower && (
          <div className={styles.follower}>フォローされています</div>
        )}
      </div>
    </List.Item>
  );
};

export default FollowerItem;

import { List } from "antd";
import { size } from "lodash";
import styles from "../style.module.scss";
import FollowerItem from "./FollowerItem";

const Follower = ({ follower, handleChangePage, handleFollowUser }) => {
  return (
    <List
      className={size(follower?.data) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      pagination={
        !!follower?.data?.length && {
          pageSize: 10,
          total: follower?.meta?.count,
          onChange: page => handleChangePage(page, "follower")
        }
      }
      dataSource={follower?.data}
      renderItem={item => (
        <FollowerItem
          item={item}
          key={item?.id}
          handleFollowUser={handleFollowUser}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default Follower;

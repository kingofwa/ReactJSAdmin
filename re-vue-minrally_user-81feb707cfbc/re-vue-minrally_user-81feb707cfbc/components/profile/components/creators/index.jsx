import { List } from "antd";
import { size } from "lodash";
import CreatorItem from "./CreatorItem";
import styles from "./style.module.scss";

const ListCreator = ({
  listData,
  handleChangePage,
  type,
  handleFollowUser
}) => {
  return (
    <List
      className={size(listData?.data) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      pagination={
        !!listData?.data?.length && {
          pageSize: 10,
          total: listData?.meta?.count,
          onChange: page => handleChangePage(page, type)
        }
      }
      dataSource={listData?.data}
      renderItem={(item, index) => (
        <CreatorItem
          item={item}
          key={index}
          handleFollowUser={handleFollowUser}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default ListCreator;

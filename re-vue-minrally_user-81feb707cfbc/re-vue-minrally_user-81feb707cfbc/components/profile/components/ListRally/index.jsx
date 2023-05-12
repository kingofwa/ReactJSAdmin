import { List } from "antd";
import { size } from "lodash";
import RallyItem from "./RallyItem";
import styles from "./style.module.scss";

const ListRally = ({
  listData,
  handleChangePage,
  type,
  handleFavorite,
  handleUnfavorite,
  typeList
}) => {
  return (
    <List
      // className={styles.list}
      className={size(listData?.data) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      pagination={
        !!listData?.data?.length && {
          pageSize: 8,
          total: listData?.meta?.count,
          showSizeChanger: false,
          onChange: page => handleChangePage(page, type)
        }
      }
      dataSource={listData?.data}
      renderItem={(item, index) => (
        <RallyItem
          item={item}
          key={index}
          handleFavorite={handleFavorite}
          handleUnfavorite={handleUnfavorite}
          type={type}
          typeList={typeList}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default ListRally;

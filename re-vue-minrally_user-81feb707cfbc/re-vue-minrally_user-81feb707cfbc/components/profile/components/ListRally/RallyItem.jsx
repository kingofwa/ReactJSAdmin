import PATHS from "@config/paths";
import { List } from "antd";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const RallyItem = ({
  item,
  handleFavorite,
  handleUnfavorite,
  type,
  typeList
}) => {
  const router = useRouter();
  const goToDetail = () => {
    router.push({
      pathname: typeList === "rally" ? PATHS.rallyDetail : PATHS.series,
      query: { id: item.id }
    });
  };

  return (
    <List.Item
      className={styles.listItem}
      extra={
        item?.is_favorite ? (
          <div onClick={() => handleUnfavorite(item.id, type)}>
            <img className={styles.image} alt="logo" src="/icons/ic-like.svg" />
          </div>
        ) : (
          <div onClick={() => handleFavorite(item.id, type)}>
            <img
              className={styles.image}
              alt="logo"
              src="/icons/ic-un-like.svg"
            />
          </div>
        )
      }
    >
      <span onClick={goToDetail} className={styles.itemName}>
        {item?.name}
      </span>
    </List.Item>
  );
};

export default RallyItem;

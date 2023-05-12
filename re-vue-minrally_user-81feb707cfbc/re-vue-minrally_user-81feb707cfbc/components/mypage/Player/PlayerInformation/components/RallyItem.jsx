import PATHS from "@config/paths";
import { List } from "antd";
import { useRouter } from "next/router";
import styles from "../style.module.scss";

const RallyItem = ({ item, unfavoriteGame, isSeries }) => {
  const router = useRouter();
  const goToDetail = () => {
    if (!isSeries) {
      router.push({
        pathname: PATHS.rallyDetail,
        query: { id: item.id }
      });
    } else {
      router.push({
        pathname: PATHS.seriDetails,
        query: { id: item.id }
      });
    }
  };
  return (
    <List.Item
      className={styles.listItem}
      extra={
        <div
          onClick={() => unfavoriteGame(item.id)}
          className={styles.favorite}
        >
          <img
            className={styles.image}
            alt="logo"
            // src={`/img/profile/${item.like ? "like.png" : "unlike.png"}`}
            src="/img/profile/like.svg"
          />
        </div>
      }
    >
      {item.isCopy && (
        <img
          className={styles.imgCopy}
          src="/icons/ic-copy.svg"
          alt="ic-copy"
        />
      )}
      <span onClick={goToDetail} className={styles.name}>
        {item?.name}
      </span>
    </List.Item>
  );
};

export default RallyItem;

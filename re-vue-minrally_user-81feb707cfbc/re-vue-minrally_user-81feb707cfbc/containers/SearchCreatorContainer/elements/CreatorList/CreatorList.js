import InfiniteScrollList from "@components/common/infinite-scroll-list";
import PATHS from "@config/paths";
import { useRouter } from "next/router";
import styles from "./CreatorList.module.scss";

const CreatorList = ({ items, fetchMoreData, pagination }) => {
  const router = useRouter();

  const goProfile = item => {
    if (item.is_creator) {
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

  const renderCreatorItem = item => {
    return (
      <div className={styles.creatorItem}>
        <div className={styles.avatar} onClick={() => goProfile(item)}>
          <img src={item?.avatar_url || "/img/avatar-holder.svg"} alt="avt" />
        </div>
        <div className={styles.userName} onClick={() => goProfile(item)}>
          {item?.user_name}
        </div>
        {item?.is_creator && <span className={styles.creator}>ラリマス</span>}
      </div>
    );
  };

  return (
    <>
      <div className={styles.creatorList}>
        <div className={styles.title}>
          <span>注目のユーザー</span>
        </div>
        <InfiniteScrollList
          data={items}
          total={pagination.total}
          fetcher={fetchMoreData}
          renderItem={item => renderCreatorItem(item)}
        />
      </div>
    </>
  );
};

export default CreatorList;

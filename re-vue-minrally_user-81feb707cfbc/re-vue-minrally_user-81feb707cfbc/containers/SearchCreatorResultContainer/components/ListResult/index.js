import InfiniteScrollList from "@components/common/infinite-scroll-list";
import { Avatar } from "antd";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import RenderButtonFollow from "@components/ButtonFollow";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ListResult = ({ creators, pagination, fetchMoreCreator }) => {
  const router = useRouter();
  const [listResult, setListResult] = useState([]);
  const auth = useAuth();
  useEffect(() => {
    setListResult(creators);
  }, [creators]);

  const goToDetail = item => {
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
    const isMe = auth?.user.id === item.id;

    return (
      <div className={styles.listResultItem}>
        <div className={styles.listResultItemTop}>
          <div className={styles.infoCreator}>
            <Avatar
              className={styles.avatar}
              src={item?.avatar_url || "/img/avatar-holder.svg"}
              onClick={() => goToDetail(item)}
            />
            <div className={styles.info}>
              <div className={styles.infoName}>
                <span className={styles.name} onClick={() => goToDetail(item)}>
                  {item.user_name}
                </span>
                {item?.is_creator && (
                  <div className={styles.creator}>ラリマス</div>
                )}
              </div>
              {item?.is_follower && (
                <div className={styles.follower}>フォローされています</div>
              )}
            </div>
          </div>
          {!isMe && <RenderButtonFollow profile={item} />}
        </div>
        <div className={styles.listResultItemBot}>{item.information}</div>
      </div>
    );
  };

  return (
    <div className={styles.listResultWrapper}>
      <div className={styles.totalResult}>該当件数：{pagination.total}件</div>
      <div className={styles.listResult}>
        <InfiniteScrollList
          data={listResult}
          total={pagination.total}
          fetcher={fetchMoreCreator}
          renderItem={item => renderCreatorItem(item)}
        />
      </div>
    </div>
  );
};

export default ListResult;

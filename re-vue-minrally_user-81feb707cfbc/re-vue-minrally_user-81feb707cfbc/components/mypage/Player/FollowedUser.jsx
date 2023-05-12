import HeaderBack from "@components/common/header/HeaderBack";
import { LoaderContext } from "@contexts/loader";
import { Skeleton } from "antd";
import { STATUS_RESPONSE } from "@utils/constants";
import { removeItemById } from "@utils/reaction";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { deleteUserFollower, getUserFollowing } from "../service";
import Followers from "./PlayerInformation/components/Followers";
import styles from "./style.module.scss";

const FollowedUser = () => {
  const [followers, setFollower] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchUserFollowing = async () => {
    try {
      if (page) {
        showLoadingAnim();
        const params = { page, per: 20 };
        const res = await getUserFollowing(params);
        setFollower([...followers, ...res.data]);
        setTotal(res.meta.count);
        setPage(res.meta.next);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const handleUnFollow = useCallback(
    id => {
      setIsLoading(true);
      deleteUserFollower(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = removeItemById(followers, id);
            setFollower([...newArray]);
            setTotal(total - 1); // update real time in client
          }
        })
        .finally(setIsLoading(false));
    },
    [followers, total]
  );

  useEffect(() => {
    fetchUserFollowing();
  }, []);

  return (
    <>
      <HeaderBack title={`フォロー中 (${total ?? 0})`} hasMenu />

      <div className={styles.listWrapper}>
        <InfiniteScroll
          dataLength={followers?.length}
          next={fetchUserFollowing}
          hasMore={followers?.length < total}
          loader={isLoading && <Skeleton paragraph={{ row: 1 }} active />}
          scrollableTarget="scrollableDiv"
        >
          <Followers followers={followers} handleUnFollow={handleUnFollow} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FollowedUser;

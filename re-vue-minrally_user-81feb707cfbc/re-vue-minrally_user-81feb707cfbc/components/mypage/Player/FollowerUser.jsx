import HeaderBack from "@components/common/header/HeaderBack";
import { LoaderContext } from "@contexts/loader";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { Skeleton } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addUserFollower,
  deleteUserFollower,
  getUsersFollower
} from "../service";
import Followers from "./PlayerInformation/components/Followers";
import styles from "./style.module.scss";

const FollowerUser = () => {
  const [followers, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchUserFollowing = async () => {
    try {
      if (page) {
        showLoadingAnim();
        const params = { page, per: 10 };
        const res = await getUsersFollower(params);
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

  const unFollowedGame = useCallback(
    id => {
      setIsLoading(true);
      deleteUserFollower(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = updateReaction(
              followers,
              id,
              "is_following",
              "number_of_followers"
            );
            setFollower([...newArray]);
            // fetchUserFollowing();
          }
        })
        .finally(setIsLoading(false));
    },
    [followers]
  );

  const followedGame = useCallback(
    id => {
      setIsLoading(true);
      addUserFollower({ user_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = updateReaction(
              followers,
              id,
              "is_following",
              "number_of_followers"
            );
            setFollower([...newArray]);
            // fetchUserFollowing();
          }
        })
        .finally(setIsLoading(false));
    },
    [followers]
  );

  useEffect(() => {
    fetchUserFollowing();
  }, []);

  return (
    <>
      <HeaderBack title={`フォロワー (${total ?? 0})`} hasMenu />
      <div className={styles.listWrapper}>
        <InfiniteScroll
          dataLength={followers?.length}
          next={fetchUserFollowing}
          hasMore={followers?.length < total}
          loader={isLoading && <Skeleton paragraph={{ row: 1 }} active />}
          // scrollableTarget="scrollableDiv"
        >
          <Followers
            followers={followers}
            handleUnFollow={unFollowedGame}
            handleFollow={followedGame}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FollowerUser;

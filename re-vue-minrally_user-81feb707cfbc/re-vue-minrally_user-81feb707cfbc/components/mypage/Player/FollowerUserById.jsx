import HeaderBack from "@components/common/header/HeaderBack";
import { LoaderContext } from "@contexts/loader";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@contexts/auth";
import PATHS from "@config/paths";
import {
  addUserFollower,
  deleteUserFollower,
  getUsersFollowerByUserId
} from "../service";
import Followers from "./PlayerInformation/components/Followers";
import styles from "./style.module.scss";

const FollowerUserById = () => {
  const [followers, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const router = useRouter();
  const auth = useAuth();

  const userId = router?.query?.id;

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchUserFollowing = async () => {
    try {
      showLoadingAnim();
      if (page && userId) {
        const params = { page, per: 10 };
        const response = await getUsersFollowerByUserId(userId, params);
        setFollower([...followers, ...response?.data]);
        setTotal(response?.meta?.count);
        setPage(response?.meta?.next);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const unFollowedUser = useCallback(
    id => {
      if (auth?.isLoggedIn) {
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
            }
          })
          .finally(setIsLoading(false));
      } else {
        router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      }
    },
    [followers]
  );

  const followedUser = useCallback(
    id => {
      if (auth?.isLoggedIn) {
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
            }
          })
          .finally(setIsLoading(false));
      } else {
        router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      }
    },
    [followers]
  );

  useEffect(() => {
    fetchUserFollowing();
  }, [userId]);

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
            handleUnFollow={unFollowedUser}
            handleFollow={followedUser}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FollowerUserById;

import HeaderBack from "@components/common/header/HeaderBack";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { updateReaction } from "@utils/reaction";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  addUserFollower,
  deleteUserFollower,
  getUserFollowingById
} from "../service";
import Followers from "./PlayerInformation/components/Followers";
import styles from "./style.module.scss";

const FollowedUserById = () => {
  const [followers, setFollower] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const auth = useAuth();
  const userId = router?.query?.id;

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchUserFollowing = async () => {
    try {
      if (page && userId) {
        showLoadingAnim();
        const params = { page, per: 20 };
        const response = await getUserFollowingById(userId, params);
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

  const handleFollow = async id => {
    try {
      if (auth?.isLoggedIn) {
        setIsLoading(true);
        await addUserFollower({ user_id: id });
        const newArray = updateReaction(
          followers,
          id,
          "is_following",
          "number_of_followers"
        );
        setFollower([...newArray]);
      } else {
        router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnFollow = async id => {
    try {
      if (auth?.isLoggedIn) {
        setIsLoading(true);
        await deleteUserFollower(id);
        // const newArray = removeItemById(followers, id);
        // setFollower([...newArray]);
        // setTotal(total - 1);

        const newArray = updateReaction(
          followers,
          id,
          "is_following",
          "number_of_followers"
        );
        setFollower([...newArray]);
      } else {
        router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserFollowing();
  }, [userId]);

  return (
    <>
      <HeaderBack title={`フォロー中 (${total ?? 0})`} hasMenu />

      <div className={styles.listWrapper}>
        <InfiniteScroll
          dataLength={followers?.length}
          next={fetchUserFollowing}
          hasMore={followers?.length < total}
          loader={isLoading && <Skeleton paragraph={{ row: 1 }} active />}
          // scrollableTarget="scrollableDiv"
          className="user-list"
        >
          <Followers
            followers={followers}
            handleUnFollow={handleUnFollow}
            handleFollow={handleFollow}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default FollowedUserById;

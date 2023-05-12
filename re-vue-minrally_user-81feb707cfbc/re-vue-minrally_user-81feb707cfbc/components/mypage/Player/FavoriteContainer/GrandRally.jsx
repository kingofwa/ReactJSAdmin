import HeaderBack from "@components/common/header/HeaderBack";
import Tab from "@components/common/tab";
import {
  getUserFavoriteSeries,
  userUnfavoriteSeries
} from "@components/mypage/service";
import { MYPAGE_FAVORITE_RALLY_TABS } from "@config/constants";
import { STATUS_RESPONSE } from "@utils/constants";
import { removeItemById } from "@utils/reaction";
import { Skeleton } from "antd";
import useUserInfo from "hooks/useUserInfo";
import OnlyHeaderLayout from "layouts/sub-layouts/only-header-layout";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ListRally from "../PlayerInformation/components/ListRally";
import styles from "./styles.module.scss";

const LikedRally = () => {
  const userInfo = useUserInfo();

  const [rallies, setRallies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [totalLiked, setTotalLiked] = useState(0);
  const [numLiked, setNumLiked] = useState(0);

  useEffect(() => {
    if (userInfo?.number_of_liked) setTotalLiked(userInfo?.number_of_liked);
  }, [userInfo?.number_of_liked]);

  const fetchUserFavorite = () => {
    if (page) {
      setIsLoading(true);
      const params = { page, per: 20 };
      getUserFavoriteSeries(params)
        .then(res => {
          setRallies([...rallies, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
          setNumLiked(res.meta.count);
        })
        .finally(setIsLoading(false));
    }
  };

  const unfavoriteGame = useCallback(
    id => {
      setIsLoading(true);
      userUnfavoriteSeries(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = removeItemById(rallies, id);
            setRallies([...newArray]);
            setTotalLiked(totalLiked - 1); // update real time in client
            setNumLiked(numLiked - 1);
          }
        })
        .finally(setIsLoading(false));
    },
    [rallies, totalLiked, numLiked]
  );

  useEffect(() => {
    fetchUserFavorite();
  }, []);

  const renderDynamicTab = useCallback(() => {
    const dynamicTab = [...MYPAGE_FAVORITE_RALLY_TABS];
    dynamicTab[0].title = `グランドラリー（${numLiked}）`;
    dynamicTab[1].title = `ラリー （${totalLiked - numLiked}）`;
    return dynamicTab;
  }, [MYPAGE_FAVORITE_RALLY_TABS, totalLiked, numLiked]);

  return (
    <div className={styles.container}>
      <HeaderBack title={`いいねしたラリー（${totalLiked ?? 0}）`} hasMenu />
      <Tab className={styles.tab} tabs={renderDynamicTab()} />
      <InfiniteScroll
        className="rally-list"
        dataLength={rallies?.length}
        next={fetchUserFavorite}
        hasMore={rallies?.length < total}
        loader={isLoading && <Skeleton paragraph={{ row: 1 }} active />}
        // scrollableTarget="scrollableDiv"
      >
        <ListRally rallies={rallies} unfavoriteGame={unfavoriteGame} isSeries />
      </InfiniteScroll>
    </div>
  );
};
LikedRally.layout = OnlyHeaderLayout;

export default LikedRally;

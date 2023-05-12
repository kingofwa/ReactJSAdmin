import HeaderBack from "@components/common/header/HeaderBack";
import Tab from "@components/common/tab";
import { getUserPlayingGames } from "@components/mypage/service";
import { MYPAGE_RALLY_TABS } from "@config/constants";
import { LoaderContext } from "@contexts/loader";
import { Skeleton } from "antd";
import OnlyHeaderLayout from "layouts/sub-layouts/only-header-layout";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PlayingGames from "../PlayerInformation/components/PlayingRally/PlayingGames";
import styles from "./style.module.scss";

const Rally = () => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [playingGames, setPlayingGames] = useState([]);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchUserPlayingGames = () => {
    if (page) {
      showLoadingAnim();
      const params = { page, per: 20 };
      getUserPlayingGames(params)
        .then(res => {
          setPlayingGames([...playingGames, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
        })
        .finally(hideLoadingAnim());
    }
  };

  useEffect(() => {
    fetchUserPlayingGames();
  }, []);

  return (
    <div className={styles.container}>
      <HeaderBack title={`参加中のラリー（${total ?? 0}）`} hasMenu />
      <Tab tabs={MYPAGE_RALLY_TABS} className="rally-tab" />
      <InfiniteScroll
        className="rally-list"
        dataLength={playingGames?.length}
        next={fetchUserPlayingGames}
        hasMore={playingGames?.length < total}
        loader={<Skeleton paragraph={{ row: 1 }} active />}
      >
        <PlayingGames playingGames={playingGames} />
      </InfiniteScroll>
    </div>
  );
};

Rally.layout = OnlyHeaderLayout;

export default Rally;

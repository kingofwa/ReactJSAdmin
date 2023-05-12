import HeaderBack from "@components/common/header/HeaderBack";
import Tab from "@components/common/tab";
import { getUserPlayingSeries } from "@components/mypage/service";
import { MYPAGE_RALLY_TABS } from "@config/constants";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { Skeleton } from "antd";
import OnlyHeaderLayout from "layouts/sub-layouts/only-header-layout";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PlayingGames from "../PlayerInformation/components/PlayingGrandRally/PlayingGames";
import styles from "./style.module.scss";

const GrandRally = () => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const auth = useAuth();

  const [playingGames, setPlayingGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();

  const fetchUserPlayingGames = () => {
    if (page) {
      showLoadingAnim();
      const params = { page, per: 20 };
      getUserPlayingSeries(params)
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
      <HeaderBack
        title={`参加中のラリー（${auth?.user?.number_of_played ?? 0}）`}
        hasMenu
      />
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

GrandRally.layout = OnlyHeaderLayout;

export default GrandRally;

/* eslint-disable import/no-unresolved */
import HeaderBack from "@components/common/header/HeaderBack";
import ListRallyDefault from "@components/common/Rallys";
import { getGamesNearByCheckin } from "@components/TopPage/service";
import { TOP_TYPE } from "@config/constants";
import PATHS from "@config/paths";
// import { LoaderContext } from "@contexts/loader";
import { TYPE_LAYOUT_RALLY } from "@utils/constants";
import { Skeleton } from "antd";
import usePosition from "hooks/usePosition";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.scss";

const NearbyCheckin = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  // const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const { lat, lng } = usePosition();
  const [isLoading, setIsLoading] = useState(true);

  const fetchGamesNearly = async () => {
    try {
      // showLoadingAnim();
      setIsLoading(true);
      const params = {
        page,
        per: 5,
        user_point_lat: lat,
        user_point_lng: lng,
        by: "spot_range"
      };
      const res = await getGamesNearByCheckin(params);
      setGames([...games, ...res.data]);
      setTotal(res.meta.count);
      if (res.meta.next) setPage(res.meta.next);
    } catch (error) {
      //
    } finally {
      // hideLoadingAnim();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (page && lat && lng) {
      fetchGamesNearly();
    }
  }, [page, lat, lng]);

  const renderContent = () => {
    if (page === 1 && isLoading) {
      return <Skeleton />;
    }
    if (games.length > 0) {
      return (
        <InfiniteScroll
          dataLength={games.length}
          next={fetchGamesNearly}
          hasMore={games.length < total}
          loader={<Skeleton paragraph={{ row: 1 }} active />}
          className={styles.infiniteScroll}
          // scrollableTarget="scrollableDiv"
        >
          <ListRallyDefault
            layout={TYPE_LAYOUT_RALLY.list}
            data={games}
            type={TOP_TYPE.GAME}
          />
        </InfiniteScroll>
      );
    }
    return (
      <p className={styles.descNoneResult}>
        チェックインできるラリーはありません。
      </p>
    );
  };

  return (
    <>
      <HeaderBack
        title="現在地からチェックインできるラリー"
        hasMenu
        backUrl={PATHS.home}
      />
      <div className={styles.container}>{renderContent()}</div>
    </>
  );
};

export default NearbyCheckin;

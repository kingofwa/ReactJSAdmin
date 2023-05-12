import ListRallyDefault from "@components/common/Rallys";
import { TOP_TYPE } from "@config/constants";
import { LoaderContext } from "@contexts/loader";
import { Skeleton } from "antd";
import usePosition from "hooks/usePosition";
import useSwitchDisplay from "hooks/useSwitchDisplay";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getGamesNearly } from "../service";
import styles from "./styles.module.scss";

const Nearly = () => {
  const { layout, renderSwitchDisplay } = useSwitchDisplay();
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const { lat, lng } = usePosition();

  const fetchGames = async () => {
    try {
      showLoadingAnim();
      const params = {
        page,
        per: 20,
        user_point_lat: lat,
        user_point_lng: lng
      };
      const res = await getGamesNearly(params);
      setGames([...games, ...res.data]);
      setTotal(res.meta.count);
      setPage(res.meta.next);
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if ((lat, lng)) {
      fetchGames();
    }
  }, [lat, lng]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.note}>
          現在地から半径800m以内で開催されている
          <br />
          ラリーを表示しています
        </div>
        {renderSwitchDisplay()}
        {games?.length > 0 && (
          <InfiniteScroll
            dataLength={games?.length}
            next={fetchGames}
            hasMore={games?.length < total}
            loader={<Skeleton paragraph={{ row: 1 }} active />}
            className={styles.infiniteScroll}
            // scrollableTarget="scrollableDiv"
          >
            <ListRallyDefault
              layout={layout}
              data={games}
              type={TOP_TYPE.GAME}
            />
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Nearly;

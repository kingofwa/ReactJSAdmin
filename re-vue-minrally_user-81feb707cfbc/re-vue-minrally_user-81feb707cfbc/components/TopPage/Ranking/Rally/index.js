import ListRallyDefault from "@components/common/Rallys";
import RankingTab from "@components/RankingTab";
import { getGamesRally } from "@components/TopPage/service";
import { RANKING_TAB, TOP_TYPE } from "@config/constants";
import { LoaderContext } from "@contexts/loader";
import { RANKING_RALLY_FILTER } from "@utils/constants";
import { Row, Select, Skeleton } from "antd";
import useSwitchDisplay from "hooks/useSwitchDisplay";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const { Option } = Select;

const RankingRally = () => {
  const router = useRouter();
  const type = router?.query?.type;
  const { layout, renderSwitchDisplay } = useSwitchDisplay();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [loaded, setLoaded] = useState(false);
  const [optionSelected, setOptionSelected] = useState();

  const fetchGamesRally = async (sortType = optionSelected) => {
    try {
      if (page) {
        if (page === 1) {
          showLoadingAnim();
        }
        const params = {
          page,
          per: 20,
          sort_by: sortType
        };
        const res = await getGamesRally(params);
        setGames([...games, ...res.data]);
        setTotal(res.meta.count);
        setPage(res.meta.next);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
      setLoaded(true);
    }
  };

  const handleChange = value => {
    setLoaded(false);
    setOptionSelected(value);
    setPage(1);
    setGames([]);
    router.replace(`${router.pathname}?type=${value}`);
  };

  // useEffect(() => {
  //   // init
  //   if (type !== undefined && type !== "") {
  //     sortBy = type;
  //     setOptionSelected(type);
  //   } else {
  //     setOptionSelected(RANKING_RALLY_FILTER.checkedCount);
  //   }
  //   if (page === 1 && games.length === 0 && loaded === false) fetchGamesRally();
  // }, [optionSelected, page, games, type]);

  useEffect(() => {
    if (type) {
      setOptionSelected(type);
      fetchGamesRally(type);
    }
  }, [type]);

  return (
    <>
      {loaded && (
        <>
          <RankingTab active={RANKING_TAB.RALLY} />
          <div className={styles.container}>
            <div className={styles.note}>
              開催中のラリーのランキングを表示しています
            </div>
            <Row justify="space-between " align="middle">
              <Select
                defaultValue={{ value: optionSelected }}
                className="rally-select"
                onChange={handleChange}
                suffixIcon={<CaretDownOutlined className="ant-select-suffix" />}
              >
                <Option value={RANKING_RALLY_FILTER.checkedCount}>
                  チェックイン数
                </Option>
                <Option value={RANKING_RALLY_FILTER.playerCount}>
                  参加者数
                </Option>
              </Select>
              {renderSwitchDisplay()}
            </Row>

            <InfiniteScroll
              dataLength={games?.length}
              next={fetchGamesRally}
              hasMore={games?.length < total}
              loader={<Skeleton paragraph={{ row: 1 }} active />}
              className={styles.infiniteScroll}
              // scrollableTarget="scrollableDiv"
            >
              <ListRallyDefault
                layout={layout}
                data={games}
                type={TOP_TYPE.RANK}
              />
            </InfiniteScroll>
          </div>
        </>
      )}

      {/* <PageTopFooter /> */}
    </>
  );
};

export default RankingRally;

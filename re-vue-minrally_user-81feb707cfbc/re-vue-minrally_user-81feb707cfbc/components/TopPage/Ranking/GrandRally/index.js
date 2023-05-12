import ListGrandRallyDefault from "@components/common/Rallys/GrandRallyItem";
import RankingTab from "@components/RankingTab";
import { getSeriesRally } from "@components/TopPage/service";
import { RANKING_TAB, TOP_TYPE } from "@config/constants";
import { LoaderContext } from "@contexts/loader";
import { RANKING_RALLY_FILTER } from "@utils/constants";
import { Row, Select, Skeleton } from "antd";
import useSwitchDisplay from "hooks/useSwitchDisplay";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import styles from "./styles.module.scss";

const { Option } = Select;

const GrandRankingRally = () => {
  const router = useRouter();
  const { layout, renderSwitchDisplay } = useSwitchDisplay();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [optionSelected, setOptionSelected] = useState();
  const [isActive, setActive] = useState(true);
  const type = router?.query?.type;

  const toggleClass = () => {
    setActive(!isActive);
  };

  const fetchGamesRally = async (typeParam = optionSelected) => {
    try {
      if (page) {
        if (page === 1) {
          showLoadingAnim();
        }
        const params = {
          page,
          per: 20,
          sort_by: typeParam
        };
        const res = await getSeriesRally(params);
        setGames([...games, ...res.data]);
        setTotal(res.meta.count);
        setPage(res.meta.next);
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  const handleChange = value => {
    setOptionSelected(value);
    router.replace({
      pathname: PATHS.rankingGrandRally,
      query: { type: value }
    });
    setPage(1);
    setGames([]);
  };

  useEffect(() => {
    if (type) {
      setOptionSelected(type);
      fetchGamesRally(type);
    }
  }, [type]);

  return (
    <>
      <RankingTab active={RANKING_TAB.GRAND_RALLY} />

      <div className={styles.container}>
        <div className={styles.note}>
          開催中のグランドラリーのランキングを表示しています
        </div>
        <Row justify="space-between " align="middle">
          <Select
            defaultValue={{ value: optionSelected }}
            className="rally-select"
            onChange={handleChange}
            key={optionSelected}
            suffixIcon={
              <CaretDownOutlined
                className={isActive ? "ant-select-suffix" : ""}
                onClick={toggleClass}
              />
            }
          >
            <Option value={RANKING_RALLY_FILTER.checkedCount}>
              チェックイン数
            </Option>
            <Option value={RANKING_RALLY_FILTER.playerCount}>参加者数</Option>
          </Select>
          {renderSwitchDisplay()}
        </Row>

        <InfiniteScroll
          dataLength={games?.length}
          next={fetchGamesRally}
          hasMore={games?.length < total}
          loader={<Skeleton paragraph={{ row: 1 }} active />}
          className={styles.infiniteScroll}
        >
          <ListGrandRallyDefault
            layout={layout}
            data={games}
            type={TOP_TYPE.RANK}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default GrandRankingRally;

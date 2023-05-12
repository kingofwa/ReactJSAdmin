import ListRallyDefault from "@components/common/Rallys";
import { TOP_TYPE } from "@config/constants";
import { LoaderContext } from "@contexts/loader";
import { RECOMMEND_FILTER } from "@utils/constants";
import { Row, Select, Skeleton } from "antd";
import useSwitchDisplay from "hooks/useSwitchDisplay";
import { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CaretDownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import { getGamesRecommend, getGrandRecommend } from "../service";
import styles from "./styles.module.scss";

const { Option } = Select;

const Recommend = () => {
  const { layout, renderSwitchDisplay } = useSwitchDisplay();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [optionSelected, setOptionSelected] = useState();
  const router = useRouter();
  const type = router?.query?.type;

  const [isActive, setActive] = useState(true);
  const toggleClass = () => {
    setActive(!isActive);
  };

  const handleChange = value => {
    router.replace({ pathname: PATHS.recommend, query: { type: value } });
    setOptionSelected(value);
    setPage(1);
    setGames([]);
  };

  const fetchGamesRecommend = async (typeSort = setOptionSelected) => {
    try {
      if (page) {
        if (page === 1) {
          showLoadingAnim();
        }
        const params = { page, per: 20 };
        if (typeSort === RECOMMEND_FILTER.rally) {
          const res = await getGamesRecommend(params);
          setGames([...games, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
        } else {
          const res = await getGrandRecommend(params);
          setGames([...games, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
        }
      }
    } catch (error) {
      //
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (type) {
      setOptionSelected(type);
      fetchGamesRecommend(type);
    }
  }, [type]);

  const isSeries = optionSelected !== RECOMMEND_FILTER.rally;

  return (
    <>
      <div className={styles.container}>
        <Row justify="space-between" align="middle">
          <Select
            defaultValue={{ value: optionSelected }}
            className={styles.filter}
            onChange={handleChange}
            key={optionSelected}
            suffixIcon={
              <CaretDownOutlined
                className={isActive ? "ant-select-suffix" : ""}
                onClick={toggleClass}
              />
            }
          >
            <Option value={RECOMMEND_FILTER.rally}>ラリー</Option>
            <Option value={RECOMMEND_FILTER.grand}>グランドラリー</Option>
          </Select>
          {renderSwitchDisplay()}
        </Row>
        {games?.length > 0 && (
          <InfiniteScroll
            dataLength={games?.length}
            next={fetchGamesRecommend}
            hasMore={games?.length < total}
            loader={<Skeleton paragraph={{ row: 1 }} active />}
            className={styles.infiniteScroll}
            // scrollableTarget="scrollableDiv"
          >
            <ListRallyDefault
              layout={layout}
              data={games}
              type={TOP_TYPE.GAME}
              isSeries={isSeries}
            />
          </InfiniteScroll>
        )}
      </div>
    </>
  );
};

export default Recommend;

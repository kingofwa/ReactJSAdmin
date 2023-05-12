import ListRallyDefault from "@components/common/Rallys";
import useSwitchDisplay from "hooks/useSwitchDisplay";
import { TOP_TYPE } from "@config/constants";
import { Row, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import styles from "./styles.module.scss";

const ListRallyResult = ({ items, fetchMoreData, pagination }) => {
  const { layout, renderSwitchDisplay } = useSwitchDisplay();

  return (
    <>
      <div className={styles.container}>
        <Row justify="space-between " align="middle">
          <div className={styles.totalResult}>
            該当件数：{pagination.total}件
          </div>
          {renderSwitchDisplay()}
        </Row>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={items.length < pagination.total}
          loader={<Skeleton paragraph={{ row: 1 }} active />}
          className={styles.infiniteScroll}
          // scrollableTarget="scrollableDiv"
        >
          <ListRallyDefault layout={layout} data={items} type={TOP_TYPE.GAME} />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default ListRallyResult;

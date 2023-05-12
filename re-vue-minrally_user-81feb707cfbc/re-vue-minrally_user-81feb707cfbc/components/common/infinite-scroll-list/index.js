import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const InfiniteScrollList = ({
  data,
  total,
  fetcher,
  renderItem,
  className = ""
}) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetcher}
      hasMore={data.length < total}
      loader={<Skeleton paragraph={{ row: 1 }} active />}
      className={className}
      // scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={data}
        split={false}
        renderItem={renderItem}
        locale={{ emptyText: "データがありません。" }}
      />
    </InfiniteScroll>
  );
};

export default InfiniteScrollList;

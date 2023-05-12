/* eslint-disable import/no-unresolved */
import HeaderBack from "@components/common/header/HeaderBack";
import { LoaderContext } from "@contexts/loader";
import { Skeleton } from "antd";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import CheckinHistoryList from "../../components/checkin-history";
import { getUserCheckinHistory } from "../../service";

const CheckinHistory = () => {
  const [checkinHistory, setCheckinHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const fetchCheckinHistory = () => {
    if (page) {
      showLoadingAnim();
      const params = { page, per: 20 };
      getUserCheckinHistory(params)
        .then(res => {
          setCheckinHistory([...checkinHistory, ...res.data]);
          setTotal(res.meta.count);
          setPage(res.meta.next);
        })
        .finally(hideLoadingAnim());
    }
  };

  useEffect(() => {
    fetchCheckinHistory();
  }, []);

  return (
    <>
      <HeaderBack title="チェックイン履歴" hasMenu />
      <InfiniteScroll
        dataLength={checkinHistory.length}
        next={fetchCheckinHistory}
        hasMore={checkinHistory?.length < total}
        loader={<Skeleton paragraph={{ row: 1 }} active />}
        // scrollableTarget="scrollableDiv"
      >
        <CheckinHistoryList isShowALl checkinHistory={checkinHistory} />
      </InfiniteScroll>
    </>
  );
};

export default CheckinHistory;

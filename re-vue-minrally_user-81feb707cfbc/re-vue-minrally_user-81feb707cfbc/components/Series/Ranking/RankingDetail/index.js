import { useRouter } from "next/router";

import RankingUsers from "@components/common/RankingUsers";
import { RANKING_FILTER } from "@utils/constants";
import { Skeleton } from "antd";
import useGrandRanking from "hooks/useGrandRanking";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@contexts/auth";
import RankingUserItem from "@components/common/RankingUsers/RankingUserItem";
import { Link } from "react-scroll";
import { find, get } from "lodash";
import styles from "./styles.module.scss";

const RankingRallyDetail = () => {
  const router = useRouter();
  const { id, param } = router.query;
  const auth = useAuth();
  const [showMe, setShowMe] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (param) {
      const type = param.replace(/-/g, "_");
      const exists = Object.values(RANKING_FILTER).includes(type);
      if (exists) setFilter(type);
    }
  }, [param]);

  const { players, fetchPlayersRanking, total, currentUser } = useGrandRanking(
    filter,
    100,
    id
  );

  const onShowMe = () => {
    setShowMe(true);
  };

  const titles = [
    {
      type: RANKING_FILTER.fastestFinishTime,
      title: "制覇速度ランキング"
    },
    {
      type: RANKING_FILTER.numberOfTimesCompleted,
      title: "制覇回数ランキング"
    }
  ];

  const title = () => {
    const item = find(titles, { type: filter });
    return get(item, "title", "");
  };

  const renderFixedUser = () => {
    if (showMe && auth.isLoggedIn && currentUser?.possition > 100) {
      return (
        <RankingUserItem
          key={currentUser?.id}
          user={currentUser}
          rank={currentUser?.possition}
          type={filter}
          isFixedUser
        />
      );
    }
    return null;
  };

  return (
    <>
      <div className={styles.headHistory}>
        <div className={styles.headHistoryTitle}>
          <div onClick={() => router.back()} className={styles.goBack}>
            <img
              src="/img/mypage/ic-back.svg"
              alt="arrow left"
              className={styles.imgBack}
            />
          </div>
          {title()} TOP100
        </div>
        {auth.isLoggedIn && currentUser && (
          <Link to="current-user" spy smooth offset={-100}>
            <span className={styles.showMe} onClick={onShowMe}>
              自分の順位
            </span>
          </Link>
        )}
      </div>

      {filter && (
        <InfiniteScroll
          dataLength={players?.length}
          next={fetchPlayersRanking}
          hasMore={players?.length < total}
          loader={<Skeleton paragraph={{ row: 1 }} active />}
          // scrollableTarget="scrollableDiv"
        >
          <RankingUsers
            users={players}
            type={filter}
            isDetail
            currentUserId={currentUser?.id}
            showMe={showMe}
          />
        </InfiniteScroll>
      )}

      {renderFixedUser()}
    </>
  );
};

export default RankingRallyDetail;

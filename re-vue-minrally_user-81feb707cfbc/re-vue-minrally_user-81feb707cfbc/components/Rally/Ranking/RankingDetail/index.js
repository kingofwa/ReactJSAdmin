import { useRouter } from "next/router";
import RankingUsers from "@components/common/RankingUsers";
import { RANKING_FILTER } from "@utils/constants";
import { Skeleton } from "antd";
import useRallyRanking from "hooks/useRallyRanking";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@contexts/auth";
import RankingUserItem from "@components/common/RankingUsers/RankingUserItem";
import { Link } from "react-scroll";
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

  const { players, fetchPlayersRanking, total, currentUser } = useRallyRanking(
    filter,
    100,
    id
  );

  const onShowMe = () => {
    setShowMe(true);
  };

  const getTitle = () => {
    let title = "";
    if (param) {
      const type = param.replace(/-/g, "_");
      switch (type) {
        case "fastest_finish_time":
          title = "制覇速度ランキング";
          break;
        case "number_of_times_completed":
          title = "制覇回数ランキング";
          break;
        default:
      }
    }
    return title;
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
          {getTitle()} TOP100
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

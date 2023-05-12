import { useRouter } from "next/router";
import RankingUsers from "@components/common/RankingUsers";
import { RANKING_FILTER } from "@utils/constants";
import { Skeleton } from "antd";
import useRallyMasterRanking from "hooks/useRallyMasterRanking";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAuth } from "@contexts/auth";
import RankingUserItem from "@components/common/RankingUsers/RankingUserItem";
import { TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import styles from "./styles.module.scss";

const RankingDetail = () => {
  const auth = useAuth();
  const router = useRouter();
  const { param } = router.query;
  const [filter, setFilter] = useState("");
  const [showMe, setShowMe] = useState(false);

  const getTitle = () => {
    let title = "";
    switch (param) {
      case "follower-count":
        title = "フォロワー数ランキング";
        break;
      case "rallies-created-count":
        title = "作成ラリー数ランキング";
        break;
      case "people-checked-count":
        title = "累計チェックイン数ランキング";
        break;
      case "people-traveled-distance":
        title = "累計移動距離数ランキング";
        break;
      default:
    }
    return title;
  };

  useEffect(() => {
    if (param) {
      const type = param.replace(/-/g, "_");
      const exists = Object.values(RANKING_FILTER).includes(type);
      if (exists) setFilter(type);
    }
  }, [param]);

  const { players, fetchPlayersRanking, total, currentUser, isLoading, page } =
    useRallyMasterRanking(filter, 100);

  const onShowMe = () => {
    setShowMe(true);
  };

  const getRouterBack = () => {
    const asPath = router?.asPath;
    let backUrl = null;
    switch (asPath) {
      case PATHS.checkedCount:
      case PATHS.traveledDistance:
      case PATHS.ralliesCompletedCount:
      case PATHS.ralliesJoinedCount:
        backUrl = PATHS.rankingUser;
        break;
      case PATHS.followerCount:
      case PATHS.ralliesCreatedCount:
      case PATHS.peopleCheckedCount:
      case PATHS.peopleTraveledDistance:
        backUrl = PATHS.rankingCreator;
        break;
      default:
        backUrl = null;
        break;
    }
    return backUrl;
  };

  const goBack = () => {
    const backUrl = getRouterBack();
    if (backUrl) {
      router.replace(backUrl);
    } else {
      router.back();
    }
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
          <div onClick={goBack} className={styles.goBack}>
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
            role={TYPE_USER.creator}
            isLoading={isLoading}
            page={page}
          />
        </InfiniteScroll>
      )}
      {renderFixedUser()}
    </>
  );
};

export default RankingDetail;

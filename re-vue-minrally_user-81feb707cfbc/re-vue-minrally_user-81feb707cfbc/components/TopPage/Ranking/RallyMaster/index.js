import RankingUsers from "@components/common/RankingUsers";
import RankingTab from "@components/RankingTab";
import { RANKING_TAB, TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import { RANKING_FILTER, RANKING_LIMIT } from "@utils/constants";
import useRallyMasterRanking from "hooks/useRallyMasterRanking";
import { get, slice } from "lodash";
import { useMemo } from "react";

const RallyMasterRanking = () => {
  const followerCount = useRallyMasterRanking(
    RANKING_FILTER.followerCount,
    RANKING_LIMIT + 1
  );
  const ralliesCreatedCount = useRallyMasterRanking(
    RANKING_FILTER.ralliesCreatedCount,
    RANKING_LIMIT + 1
  );
  const peopleCheckedCount = useRallyMasterRanking(
    RANKING_FILTER.peopleCheckedCount,
    RANKING_LIMIT + 1
  );
  const peopleTraveledDistance = useRallyMasterRanking(
    RANKING_FILTER.peopleTraveledDistance,
    RANKING_LIMIT + 1
  );

  const rallyMasterRanking = useMemo(
    () => [
      {
        id: 1,
        users: slice(followerCount?.players, 0, 5),
        type: RANKING_FILTER.followerCount,
        path: PATHS.followerCount,
        title: "フォロワー数ランキング",
        content: "フォロワー数が多いラリーマスターのランキングです。",
        isLoading: followerCount?.isLoading,
        isShowDetail: get(followerCount, "players.[5].follower_count") > 0
      },
      {
        id: 2,
        users: slice(ralliesCreatedCount?.players, 0, 5),
        type: RANKING_FILTER.ralliesCreatedCount,
        path: PATHS.ralliesCreatedCount,
        title: "作成ラリー数ランキング",
        content: "作成しているラリー数が多いラリーマスターのランキングです。",
        isLoading: ralliesCreatedCount?.isLoading,
        isShowDetail:
          get(ralliesCreatedCount, "players.[5].rallies_created_count") > 0
      },
      {
        id: 3,
        users: slice(peopleCheckedCount?.players, 0, 5),
        type: RANKING_FILTER.peopleCheckedCount,
        path: PATHS.peopleCheckedCount,
        title: "累計チェックイン数ランキング",
        content:
          "作成しているラリーにおけるプレイヤーのチェックイン数が多いラリーマスターのランキングです。",
        isLoading: peopleCheckedCount?.isLoading,
        isShowDetail:
          get(peopleCheckedCount, "players.[5].people_checked_count") > 0
      },
      {
        id: 4,
        users: slice(peopleTraveledDistance?.players, 0, 5),
        type: RANKING_FILTER.peopleTraveledDistance,
        path: PATHS.peopleTraveledDistance,
        title: "累計移動距離数ランキング",
        content:
          "作成しているラリーにおけるプレイヤーの総移動距離が多いラリーマスターのランキングです。",
        isLoading: peopleTraveledDistance?.isLoading,
        isShowDetail:
          get(peopleTraveledDistance, "players.[5].people_traveled_distance") >
          0
      }
    ],
    [
      followerCount,
      ralliesCreatedCount,
      peopleCheckedCount,
      peopleTraveledDistance
    ]
  );

  return (
    <>
      <RankingTab active={RANKING_TAB.CREATOR} />

      {rallyMasterRanking?.map(item => (
        <RankingUsers
          users={item.users}
          type={item.type}
          path={item.path}
          title={item.title}
          content={item.content}
          key={item.id}
          role={TYPE_USER.creator}
          isLoading={item?.isLoading}
          page={1}
          isShowDetail={item?.isShowDetail}
        />
      ))}
    </>
  );
};

export default RallyMasterRanking;

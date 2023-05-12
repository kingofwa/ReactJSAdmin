import RankingUsers from "@components/common/RankingUsers";
import RankingTab from "@components/RankingTab";
import { RANKING_TAB, TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import { RANKING_FILTER, RANKING_LIMIT } from "@utils/constants";
import usePlayerRanking from "hooks/usePlayerRanking";
import { get, slice } from "lodash";
import { useMemo } from "react";

const PlayerRanking = () => {
  const checkedCount = usePlayerRanking(
    RANKING_FILTER.checkedCount,
    RANKING_LIMIT + 1
  );
  const traveledDistance = usePlayerRanking(
    RANKING_FILTER.traveledDistance,
    RANKING_LIMIT + 1
  );
  const ralliesCompletedCount = usePlayerRanking(
    RANKING_FILTER.ralliesCompletedCount,
    RANKING_LIMIT + 1
  );
  const ralliesJoinedCount = usePlayerRanking(
    RANKING_FILTER.ralliesJoinedCount,
    RANKING_LIMIT + 1
  );

  const playerRanking = useMemo(
    () => [
      {
        id: 1,
        users: slice(checkedCount?.players, 0, 5),
        type: RANKING_FILTER.checkedCount,
        path: PATHS.checkedCount,
        title: "チェックイン数ランキング",
        content:
          "すべてのラリーにおけるチェックイン数が多いプレイヤーのランキングです。",
        isLoading: checkedCount?.isLoading,
        isShowDetail: get(checkedCount, "players.[5].checked_count") > 0
      },
      {
        id: 2,
        users: slice(traveledDistance?.players, 0, 5),
        type: RANKING_FILTER.traveledDistance,
        path: PATHS.traveledDistance,
        title: "総移動距離ランキング",
        content:
          "すべてのラリーにおける総移動距離が多いプレイヤーのランキングです。\n参加しているラリーの１つ目のチェックインスポットから、周ったスポットの直線距離の累計がカウントされます。",
        isLoading: traveledDistance?.isLoading,
        isShowDetail: get(traveledDistance, "players.[5].traveled_distance") > 0
      },
      {
        id: 3,
        users: slice(ralliesCompletedCount?.players, 0, 5),
        type: RANKING_FILTER.ralliesCompletedCount,
        path: PATHS.ralliesCompletedCount,
        title: "制覇ラリー数ランキング",
        content: "制覇したラリー数が多いプレイヤーのランキングです。",
        isLoading: ralliesCompletedCount?.isLoading,
        isShowDetail:
          get(ralliesCompletedCount, "players.[5].rallies_completed_count") > 0
      },
      {
        id: 4,
        users: slice(ralliesJoinedCount?.players, 0, 5),
        type: RANKING_FILTER.ralliesJoinedCount,
        path: PATHS.ralliesJoinedCount,
        title: "参加ラリー数ランキング",
        content: "参加しているラリー数が多いプレイヤーのランキングです。",
        isLoading: ralliesJoinedCount?.isLoading,
        isShowDetail:
          get(ralliesJoinedCount, "players.[5].rallies_joined_count") > 0
      }
    ],
    [checkedCount, traveledDistance, ralliesCompletedCount, ralliesJoinedCount]
  );

  return (
    <>
      <RankingTab active={RANKING_TAB.USER} />

      {playerRanking?.map(item => (
        <RankingUsers
          users={item.users}
          type={item.type}
          path={item.path}
          title={item.title}
          content={item.content}
          key={item.id}
          role={TYPE_USER.player}
          isLoading={item.isLoading}
          page={1}
          isShowDetail={item?.isShowDetail}
        />
      ))}
    </>
  );
};

export default PlayerRanking;

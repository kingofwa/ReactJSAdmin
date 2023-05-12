/* eslint-disable import/no-unresolved */
import RankingUsers from "@components/common/RankingUsers";
import RallyInfo from "@components/Rally/RallyInfo";
import { TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import { getDetailGame, getSpotGame } from "@services/game";
import { QrCodeEnum, RANKING_FILTER, RANKING_LIMIT } from "@utils/constants";
import { message, Spin } from "antd";
import useRallyRanking from "hooks/useRallyRanking";
import { useEffect, useMemo, useState } from "react";
// import { useAuth } from "@contexts/auth";
import CheckInSpot from "@components/Rally/RallyDetails/components/CheckInSpot";
import { filter, size } from "lodash";
import { isNotExpired } from "@utils/helper";

const RallyRankingContainer = ({ id, gameData }) => {
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState({});
  const [isAllSpotGps, setIsAllSpotGps] = useState(false);

  useEffect(() => {
    if (gameData) {
      setGame(gameData);
    }
  }, [gameData]);

  const fetchGameDetail = async isFirst => {
    try {
      if (isFirst) {
        setLoading(true);
      }
      const res = await getDetailGame(id);
      setGame(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSpot = async () => {
    const spots = await getSpotGame(id);
    const spotGps = filter(
      spots,
      spot => spot?.allow_type_of_checkin === QrCodeEnum.GPS
    );
    setIsAllSpotGps(size(spots) === size(spotGps));
  };

  useEffect(() => {
    if (id) {
      fetchSpot();
    }
  }, [id]);

  const fastestFinishTime = useRallyRanking(
    RANKING_FILTER.fastestFinishTime,
    RANKING_LIMIT,
    id
  ).players;
  const numberOfTimesCompleted = useRallyRanking(
    RANKING_FILTER.numberOfTimesCompleted,
    RANKING_LIMIT,
    id
  ).players;

  const playerRanking = useMemo(
    () => [
      {
        id: 1,
        users: fastestFinishTime,
        type: RANKING_FILTER.fastestFinishTime,
        path: PATHS.rallyFastestFinishTime.replace(/:id/, id),
        title: "制覇速度ランキング",
        content: "制覇までの時間が短いプレイヤーのランキングです。"
      },
      {
        id: 2,
        users: numberOfTimesCompleted,
        type: RANKING_FILTER.numberOfTimesCompleted,
        path: PATHS.rallyNumberOfTimesCompleted.replace(/:id/, id),
        title: "制覇回数ランキング",
        content: "制覇回数が多いプレイヤーのランキングです。"
      }
    ],
    [fastestFinishTime, numberOfTimesCompleted]
  );

  return (
    <>
      <Spin spinning={loading}>
        <RallyInfo
          game={game}
          fetchGameDetail={fetchGameDetail}
          isLoading={loading}
        />
        {playerRanking?.map(item => (
          <RankingUsers
            users={item.users}
            type={item.type}
            path={item.path}
            title={item.title}
            content={item.content}
            key={item.id}
            role={TYPE_USER.player}
          />
        ))}

        {isAllSpotGps &&
          isNotExpired(gameData?.start_date, gameData?.end_date) && (
            <CheckInSpot
              gameId={id}
              callback={fetchGameDetail}
              rallyName={game?.name}
            />
          )}
      </Spin>
    </>
  );
};

export default RallyRankingContainer;

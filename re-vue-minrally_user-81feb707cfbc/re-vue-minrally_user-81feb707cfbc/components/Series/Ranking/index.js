/* eslint-disable import/no-unresolved */
import RankingUsers from "@components/common/RankingUsers";
import {
  addUserFollower,
  deleteUserFollower
} from "@components/mypage/service";
import HeaderSeri from "@components/Series/components/Header";
import { LoaderContext } from "@contexts/loader";
import { favoriteSeri, unFavoriteSeri } from "@services/profile";
import {
  RANKING_FILTER,
  RANKING_LIMIT,
  STATUS_RESPONSE
} from "@utils/constants";
import { message } from "antd";
import useGrandRanking from "hooks/useGrandRanking";
import { TYPE_USER } from "@config/constants";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getSeriesDetail } from "../services";

const SeriRankingPage = ({ serieId, serieDetail }) => {
  const router = useRouter();
  const auth = useAuth();
  const [serieData, setSerieData] = useState();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSeriesDetail = async isFirst => {
    try {
      if (isFirst) {
        setIsLoading(true);
      }
      showLoadingAnim();
      const data = await getSeriesDetail(serieId);
      setSerieData(data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (serieDetail) {
      setSerieData(serieDetail);
    }
  }, [serieDetail]);

  const handleFavoriteSeri = useCallback(() => {
    if (auth.isLoggedIn) {
      if (serieData?.is_favorite) {
        unFavoriteSeri(serieId)
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      } else {
        favoriteSeri({ serie_id: serieId })
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriesDetail()
          )
          .finally(hideLoadingAnim());
      }
    } else {
      const newSerieData = {
        ...serieData,
        is_favorite: !serieData.is_favorite,
        number_of_favorites: serieData.is_favorite
          ? serieData?.number_of_favorites - 1
          : serieData?.number_of_favorites + 1
      };
      setSerieData(newSerieData);
    }
  }, [serieId, serieData?.is_favorite]);

  const handleFollow = useCallback(
    id => {
      showLoadingAnim();
      addUserFollower({ user_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleUnFollow = useCallback(
    id => {
      showLoadingAnim();
      deleteUserFollower(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchSeriesDetail();
            // const newArray = updateReaction(listResult, id, "is_following");
            // setListResult([...newArray]);
          }
        })
        .finally(hideLoadingAnim());
    },
    [serieId, serieData?.is_following]
  );

  const handleFollowUser = () => {
    if (auth?.isLoggedIn) {
      if (!serieData?.owner?.is_following) {
        handleFollow(serieData?.owner?.id);
      } else {
        handleUnFollow(serieData?.owner?.id);
      }
    }
    router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
  };

  const fastestFinishTime = useGrandRanking(
    RANKING_FILTER.fastestFinishTime,
    RANKING_LIMIT,
    serieId
  ).players;
  const numberOfTimesCompleted = useGrandRanking(
    RANKING_FILTER.numberOfTimesCompleted,
    RANKING_LIMIT,
    serieId
  ).players;

  const grandRanking = useMemo(
    () => [
      {
        id: 1,
        users: fastestFinishTime,
        type: RANKING_FILTER.fastestFinishTime,
        path: PATHS.seriFastestFinishTime.replace(/:id/, serieId),
        title: "制覇速度ランキング",
        content: "制覇までの時間が短いプレイヤーのランキングです。"
      },
      {
        id: 2,
        users: numberOfTimesCompleted,
        type: RANKING_FILTER.numberOfTimesCompleted,
        path: PATHS.seriNumberOfTimesCompleted.replace(/:id/, serieId),
        title: "制覇回数ランキング",
        content: "制覇回数が多いプレイヤーのランキングです。"
      }
    ],
    [fastestFinishTime, numberOfTimesCompleted]
  );

  return (
    <>
      <HeaderSeri
        serieDetail={serieData}
        handleFavoriteSeri={handleFavoriteSeri}
        handleFollowUser={handleFollowUser}
        serieId={serieId}
        isLoading={isLoading}
      />

      {grandRanking?.map(item => (
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
      {/* <RankingUserList />
      <RankingUserList /> */}
    </>
  );
};

export default SeriRankingPage;

import CouponBtn from "@components/Coupon/CouponBtn";
import {
  addUserFollower,
  deleteUserFollower
} from "@components/mypage/service";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import {
  favoriteGame,
  favoriteSeri,
  unFavoriteGame,
  unFavoriteSeri
} from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { message } from "antd";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import HeaderSeri from "../components/Header";
import RallyPlaying from "../components/ListRally";
import {
  getFootprintsSeri,
  getSeriesDetail,
  getSeriesGames
} from "../services";
import History from "./History";
import styles from "./styles.module.scss";

const SerieDetail = ({ serieId, serieDetail }) => {
  const [seriGames, setSeriGames] = useState([]);
  const [pageGames, setPageGames] = useState(1);
  const [footprints, setFootprints] = useState();
  const [serieData, setSerieData] = useState();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (serieDetail) {
      setSerieData(serieDetail);
    }
  }, [serieDetail]);

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCouponRewards, setHasCouponRewards] = useState(false);

  const fetchSeriesDetail = async isFirst => {
    try {
      if (isFirst) {
        setIsLoading(true);
      }
      showLoadingAnim();
      const data = await getSeriesDetail(serieId);
      setSerieData(data);
      setHasCouponRewards(data?.current_status?.has_available_coupon_rewards);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
      setIsLoading(false);
    }
  };

  const fetchFootprints = async () => {
    try {
      showLoadingAnim();
      const data = await getFootprintsSeri(serieId);
      setFootprints(data);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
    }
  };

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
      // router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
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
    } else {
      router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    }
  };

  const fetchSeriGames = async pageChange => {
    try {
      showLoadingAnim();
      const params = { page: pageChange || pageGames, per: 5 };

      const response = await getSeriesGames(serieId, params);
      if (response.status === STATUS_RESPONSE.success) setSeriGames(response);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim(false);
    }
  };

  const handleFavoriteGame = (isFavorite, id) => {
    if (auth?.isLoggedIn) {
      if (isFavorite) {
        unFavoriteGame(id)
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriGames()
          )
          .finally(hideLoadingAnim());
      } else {
        favoriteGame({ game_id: id })
          .then(
            res => res.status === STATUS_RESPONSE.success && fetchSeriGames()
          )
          .finally(hideLoadingAnim());
      }
    } else {
      const newArray = updateReaction(
        seriGames?.data,
        id,
        "is_favorite",
        "number_of_favorites"
      );
      setSeriGames({ ...seriGames, data: [...newArray] });
    }
  };

  const handleChangePage = page => {
    setPageGames(page);
    fetchSeriGames(page);
  };

  useEffect(() => {
    if (serieId) {
      fetchSeriGames();
      fetchFootprints();
    }
  }, [serieId]);

  return (
    <>
      <HeaderSeri
        serieDetail={serieData}
        handleFavoriteSeri={handleFavoriteSeri}
        handleFollowUser={handleFollowUser}
        serieId={serieId}
        isLoading={isLoading}
        hasCouponRewards={hasCouponRewards}
      />
      <RallyPlaying
        seriGames={seriGames}
        handleChangePage={handleChangePage}
        handleFavoriteGame={handleFavoriteGame}
      />
      {auth?.isLoggedIn && <History footprints={footprints} id={serieId} />}
      {auth?.isLoggedIn && serieData?.current_status?.has_coupon_rewards && (
        <div className={styles.CouponWrapper}>
          <CouponBtn
            onClick={() => {
              router.push({
                pathname: PATHS.grandCoupon,
                query: { id: serieId }
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default SerieDetail;

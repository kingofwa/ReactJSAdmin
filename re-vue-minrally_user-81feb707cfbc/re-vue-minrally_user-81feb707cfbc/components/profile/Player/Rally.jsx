import Tab from "@components/common/tab";
import CollapseWrapper from "@components/mypage/components/collapse-wrapper";
import Head from "@components/profile/components/head";
import { PROFILES_PLAYER_TAB, TYPE_LIST } from "@config/constants";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import {
  favoriteGame,
  getProfileGameFavorite,
  getProfileGamePlaying,
  getProfileInfo,
  unFavoriteGame
} from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { message } from "antd";
import useMe from "hooks/useMe";
import { useContext, useEffect, useState } from "react";
import ListRally from "../components/ListRally";

const ProfilePlayerRally = ({ id }) => {
  const [profile, setProfile] = useState();
  const [playingGames, setPlayingGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [pagePlaying, setPagePlaying] = useState(1);
  const [pageFavorite, setPageFavorite] = useState(1);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const auth = useAuth();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const getProfile = async () => {
    showLoadingAnim();
    try {
      const res = await getProfileInfo(id);
      setProfile(res);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  const fetchProfilePlaying = async (page, per = 8) => {
    showLoadingAnim();
    try {
      const params = { page, per };
      const response = await getProfileGamePlaying(id, params);
      setPlayingGames(response);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  const fetchProfileFavorite = async (page, per = 8) => {
    showLoadingAnim();
    try {
      const params = { page, per };
      const response = await getProfileGameFavorite(id, params);

      // check no data then call the previous page
      if (response.meta.page !== 1 && response.data.length === 0) {
        setPageFavorite(response.meta.page - 1);
      }
      setFavorites(response);
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  const handleReactionNoLogin = (idGame, type) => {
    if (type === "playing") {
      const listPlaying = playingGames?.data;
      const newArray = updateReaction(listPlaying, idGame, "is_favorite");
      setPlayingGames({ ...playingGames, data: [...newArray] });
    }
    if (type === "favorite") {
      const listFavorites = favorites?.data;
      const newArray = updateReaction(listFavorites, idGame, "is_favorite");
      setFavorites({ ...favorites, data: [...newArray] });
    }
  };

  const handleFavoriteGame = (idGame, type) => {
    if (auth.isLoggedIn) {
      showLoadingAnim();
      favoriteGame({ game_id: idGame })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            if (type === "playing") fetchProfilePlaying(pagePlaying);
            if (type === "favorite") fetchProfileFavorite(pageFavorite);
          }
        })
        .finally(hideLoadingAnim());
    } else {
      handleReactionNoLogin(idGame, type);
    }
  };

  const handleUnfavoriteGame = (idGame, type) => {
    if (auth.isLoggedIn) {
      showLoadingAnim();
      unFavoriteGame(idGame)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            if (type === "playing") fetchProfilePlaying(pagePlaying);
            if (type === "favorite") fetchProfileFavorite(pageFavorite);
          }
        })
        .catch(error => message.error(error?.message))
        .finally(hideLoadingAnim());
    } else {
      handleReactionNoLogin(idGame, type);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProfileFavorite(pageFavorite);
    }
  }, [id, pageFavorite]);

  useEffect(() => {
    if (id) {
      getProfile();
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProfilePlaying(pagePlaying);
    }
  }, [id, pagePlaying]);

  useEffect(() => {
    if (auth?.user?.id && auth?.user?.id === id) {
      setIsMyProfile(true);
    }
  }, [auth, id]);

  const handleChangePage = (page, type) => {
    if (type === "playing") setPagePlaying(page);
    if (type === "favorite") setPageFavorite(page);
  };

  const isSelf = useMe(profile?.id);

  return (
    <>
      <Head
        profile={profile}
        getProfile={getProfile}
        isMyProfile={isMyProfile}
      />
      <Tab tabs={PROFILES_PLAYER_TAB} id={id} className="profile-tab" />

      <CollapseWrapper
        title={`参加中のラリー（${playingGames?.meta?.count || 0})`}
        isDefaultActive
      >
        {isSelf || profile?.setting?.show_participating_rally ? (
          <ListRally
            listData={playingGames}
            handleChangePage={handleChangePage}
            type="playing"
            handleFavorite={handleFavoriteGame}
            handleUnfavorite={handleUnfavoriteGame}
            typeList={TYPE_LIST.rally}
          />
        ) : (
          <span className="none-public">
            このユーザーの参加中のラリーは非公開です。
          </span>
        )}
      </CollapseWrapper>

      <CollapseWrapper
        title={`いいねしたラリー（${favorites?.meta?.count || 0})`}
        isDefaultActive
      >
        {isSelf || profile?.setting?.show_favoriteing_rally ? (
          <ListRally
            listData={favorites}
            type="favorite"
            handleChangePage={handleChangePage}
            handleFavorite={handleFavoriteGame}
            handleUnfavorite={handleUnfavoriteGame}
            typeList={TYPE_LIST.rally}
          />
        ) : (
          <span className="none-public">
            このユーザーのいいねしたラリーは非公開です。
          </span>
        )}
      </CollapseWrapper>
    </>
  );
};

export default ProfilePlayerRally;

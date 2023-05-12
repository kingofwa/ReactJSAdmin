import Tab from "@components/common/tab";
import Head from "@components/profile/components/head";
import CollapseWrapper from "@components/Series/components/collapse-wrapper";
import { PROFILES_CREATOR_TAB, TYPE_LIST } from "@config/constants";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import {
  favoriteGame,
  getProfileGameFavorite,
  getProfileGamePlaying,
  getProfileGames,
  getProfileInfo,
  unFavoriteGame
} from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { message } from "antd";
import useMe from "hooks/useMe";
import { useContext, useEffect, useState } from "react";
import ListRally from "../components/ListRally";

const ProfileCreatorRally = ({ id }) => {
  const auth = useAuth();

  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [profile, setProfile] = useState();
  const [playingGames, setPlayingGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [games, setGames] = useState([]);
  const [pagePlaying, setPagePlaying] = useState(1);
  const [pageFavorite, setPageFavorite] = useState(1);
  const [pageGame, setPageGame] = useState(1);
  const [isMyProfile, setIsMyProfile] = useState(false);

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

  const fetchProfileGames = async (page, per = 8) => {
    showLoadingAnim();
    try {
      const params = { page, per };
      const response = await getProfileGames(id, params);
      setGames(response);
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
    if (type === "game") {
      const listRally = games?.data;
      const newArray = updateReaction(
        listRally,
        idGame,
        "is_favorite",
        "number_of_favorites"
      );
      setGames({ ...games, data: [...newArray] });
    }
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
            if (type === "game") fetchProfileGames(pageGame);
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
            if (type === "game") fetchProfileGames(pageGame);
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
      fetchProfileGames(pageGame);
    }
  }, [id, pageGame]);

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
    if (type === "game") setPageGame(page);
  };

  const isSelf = useMe(profile?.id);

  return (
    <>
      <Head
        profile={profile}
        getProfile={getProfile}
        isMyProfile={isMyProfile}
      />
      <Tab tabs={PROFILES_CREATOR_TAB} id={id} className="profile-tab" />
      {profile?.is_creator && (
        <CollapseWrapper
          title={`作成したラリー（${games?.meta?.count || 0}）`}
          isDefaultActive
        >
          {isSelf || profile?.setting?.show_created_rally ? (
            <ListRally
              listData={games}
              handleChangePage={handleChangePage}
              type="game"
              handleFavorite={handleFavoriteGame}
              handleUnfavorite={handleUnfavoriteGame}
              typeList={TYPE_LIST.rally}
            />
          ) : (
            <span className="none-public">
              このユーザーの作成したラリーは非公開です。
            </span>
          )}
        </CollapseWrapper>
      )}

      <CollapseWrapper
        title={`参加中のラリー（${playingGames?.meta?.count || 0}）`}
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
            このユーザーの参考中のラリーは非公開です。
          </span>
        )}
      </CollapseWrapper>
      <CollapseWrapper
        title={`いいねしたラリー（${favorites?.meta?.count || 0}）`}
        isDefaultActive
      >
        {isSelf || profile?.setting?.show_favoriteing_rally ? (
          <ListRally
            listData={favorites}
            handleChangePage={handleChangePage}
            type="favorite"
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

export default ProfileCreatorRally;

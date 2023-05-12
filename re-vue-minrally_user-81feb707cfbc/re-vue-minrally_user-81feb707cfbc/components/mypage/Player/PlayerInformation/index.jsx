import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { useMessage } from "@contexts/message";
import { logout } from "@services/session";
import { getUserInfo } from "@services/user/info";
import { STATUS_RESPONSE } from "@utils/constants";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useState } from "react";
import CheckinHistoryList from "../../components/checkin-history";
import CollapseWrapper from "../../components/collapse-wrapper";
import Head from "../../components/head";
import {
  getUserCheckinHistory,
  getUserFavoriteGame,
  getUserFollowing,
  getUserPlayingGames,
  userUnfavoriteGame
} from "../../service";
import SettingPlayer from "../settings";
import Followers from "./components/Followers";
import ListRally from "./components/ListRally";
import PlayingGames from "./components/PlayingGrandRally/PlayingGames";

const PlayerInformation = () => {
  const [rallies, setRallies] = useState([]);
  const [playingGames, setPlayingGames] = useState([]);
  const [checkinHistory, setCheckinHistory] = useState([]);
  const [followers, setFollower] = useState([]);
  const [pagePlaying, setPagePlaying] = useState(1);
  const [pageFavorite, setPageFavorite] = useState(1);
  const [pageFollowers, setPageFollowers] = useState(1);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const { setMessage } = useMessage();
  const [userInfo, setUserInfo] = useState();
  const router = useRouter();

  const auth = useAuth();

  useEffect(() => {
    if (auth?.isLoggedIn) getUserInfo().then(res => setUserInfo(res));
  }, [auth?.isLoggedIn]);

  const fetchUserFavorite = useCallback(() => {
    showLoadingAnim();
    const params = { page: pageFavorite, per: 10 };
    getUserFavoriteGame(params)
      .then(res => {
        setRallies(res);
      })
      .finally(hideLoadingAnim());
  }, [pageFavorite]);

  const fetchUserPlayingGames = useCallback(() => {
    showLoadingAnim();
    const params = { page: pagePlaying, per: 5 };
    getUserPlayingGames(params)
      .then(res => {
        setPlayingGames(res);
      })
      .finally(hideLoadingAnim());
  }, [pagePlaying]);

  const fetchCheckinHistory = useCallback(() => {
    showLoadingAnim();
    const params = { page: 1, per: 4 };
    getUserCheckinHistory(params)
      .then(res => {
        setCheckinHistory(res.data);
      })
      .finally(hideLoadingAnim());
  }, []);

  const fetchUserFollowing = useCallback(() => {
    showLoadingAnim();
    const params = { page: pageFollowers, per: 10 };
    getUserFollowing(params)
      .then(res => {
        setFollower(res);
      })
      .finally(hideLoadingAnim());
  }, [pageFollowers]);

  const unfavoriteGame = id => {
    showLoadingAnim();
    userUnfavoriteGame(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) fetchUserFavorite();
      })
      .finally(hideLoadingAnim());
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchUserPlayingGames();
    }
  }, [fetchUserPlayingGames, auth.isLoggedIn]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchUserFavorite();
    }
  }, [fetchUserFavorite, auth.isLoggedIn]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchCheckinHistory();
    }
  }, [fetchCheckinHistory, auth.isLoggedIn]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchUserFollowing();
    }
  }, [fetchUserFollowing, auth.isLoggedIn]);

  const handleChangePage = (page, type) => {
    if (type === "parti") setPagePlaying(page);
    else if (type === "favorite") setPageFavorite(page);
    else if (type === "follower") setPageFollowers(page);
  };

  const handleLogout = async () => {
    try {
      await logout();
      auth.logUserOut();
    } catch (error) {
      setMessage({
        type: "error",
        title: error,
        message: ""
      });
    } finally {
      router.push(PATHS.home);
    }
  };

  const setting = [
    {
      id: 0,
      title: "連携サービス",
      value: userInfo?.email,
      btnText: "ログアウト",
      onClick: () => handleLogout()
    },
    {
      id: 1,
      title: "ユーザー名",
      value: userInfo?.user_name,
      btnText: "編 集"
    },
    {
      id: 2,
      title: "生年",
      value: userInfo?.year_of_birth,
      btnText: "編 集"
    },
    {
      id: 3,
      title: "性別",
      value: userInfo?.sex,
      btnText: "編 集"
    },
    {
      id: 4,
      title: "住所",
      value: userInfo?.address,
      btnText: "編 集"
    },
    {
      id: 5,
      title: "住所",
      value: userInfo?.address,
      btnText: "編 集"
    }
  ];

  return (
    <>
      <Head />
      <CollapseWrapper
        title={`参加中のラリー（${playingGames?.meta?.count ?? 0}）`}
      >
        <PlayingGames
          playingGames={playingGames}
          handleChangePage={handleChangePage}
        />
      </CollapseWrapper>
      <CollapseWrapper
        title={`いいねしたラリー（${rallies?.meta?.count ?? 0} ）`}
      >
        <ListRally
          rallies={rallies}
          handleChangePage={handleChangePage}
          unfavoriteGame={unfavoriteGame}
        />
      </CollapseWrapper>

      <CollapseWrapper
        title={`フォロー中のクリエイター (${followers?.meta?.count ?? 0} ）`}
      >
        <Followers followers={followers} handleChangePage={handleChangePage} />
      </CollapseWrapper>
      <CollapseWrapper title="チェックイン履歴">
        <CheckinHistoryList checkinHistory={checkinHistory} />
      </CollapseWrapper>
      <CollapseWrapper title="設定" subTitle="（非公開情報）">
        <SettingPlayer setting={setting} />
      </CollapseWrapper>
    </>
  );
};

export default PlayerInformation;

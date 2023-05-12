import UserInfo from "@components/mypage/components/UserInfo";
import PATHS from "@config/paths";
import { LoaderContext } from "@contexts/loader";
import { getUserInfo } from "@services/user/info";
import { Button, message, Row, Skeleton } from "antd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import CollapseWrapper from "../../components/collapse-wrapper/index";
import { getUserGames, getUserSeries } from "../../service";
import RallyCreated from "./components/RallyCreated";
import RallyPlaying from "./components/RallyPlaying";
import styles from "./style.module.scss";

const CreatorInformation = () => {
  const [userGame, setUserGame] = useState([]);
  const [series, setSeries] = useState([]);
  // const [follower, setFollower] = useState([]);
  // const [pageFollower, setPageFollower] = useState(1);
  const [pageSeries, setPageSeries] = useState(1);
  const [pageGames, setPageGames] = useState(1);
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const [userInfo, setUserInfo] = useState();
  // const { setMessage } = useMessage();
  const [loadingGame, setLoadingGame] = useState(false);
  const [loadingSerie, setLoadingSerie] = useState(false);

  const router = useRouter();
  // const auth = useAuth();

  useEffect(() => {
    showLoadingAnim();
    getUserInfo()
      .then(res => {
        if (res) {
          setUserInfo(res);
        }
      })
      .catch(err => message.error(err))
      .finally(hideLoadingAnim());
  }, []);

  const fetchUserGames = async () => {
    try {
      setLoadingGame(true);
      const params = { page: pageGames, per: 5 };
      const response = await getUserGames(params);
      setUserGame(response);
    } catch (error) {
      //
    } finally {
      setLoadingGame(false);
    }
  };

  const fetchUserSeries = async () => {
    try {
      setLoadingSerie(true);
      const params = { page: pageSeries, per: 5 };
      const response = await getUserSeries(params);
      setSeries(response);
    } catch (error) {
      //
    } finally {
      setLoadingSerie(false);
    }
  };

  useEffect(() => {
    fetchUserSeries();
  }, [pageSeries]);

  useEffect(() => {
    fetchUserGames();
  }, [pageGames]);

  // const fetchUserGames = useCallback(() => {
  //   showLoadingAnim();
  //   const params = { page: pageGames, per: 5 };
  //   getUserGames(params)
  //     .then(res => {
  //       setUserGame(res);
  //     })
  //     .finally(hideLoadingAnim());
  // }, [pageGames]);

  // const fetchUserSeries = useCallback(() => {
  //   showLoadingAnim();
  //   const params = { page: pageSeries, per: 5 };
  //   getUserSeries(params)
  //     .then(res => {
  //       setSeries(res);
  //     })
  //     .finally(hideLoadingAnim());
  // }, [pageSeries]);

  // useEffect(() => {
  //   fetchUserGames();
  // }, [fetchUserGames]);

  // useEffect(() => {
  //   fetchUserSeries();
  // }, [fetchUserSeries]);

  const handleChangePage = (page, type) => {
    if (type === "games") setPageGames(page);
    else if (type === "series") setPageSeries(page);
    // else if (type === "follower") setPageFollower(page);
  };

  const renderSeries = () => {
    if (pageSeries === 1 && loadingSerie) {
      return <Skeleton />;
    }
    return (
      <RallyCreated
        series={series}
        handleChangePage={handleChangePage}
        userId={userInfo?.id}
        fetchUserSeries={fetchUserSeries}
      />
    );
  };

  const renderGames = () => {
    if (loadingGame && pageGames === 1) {
      return <Skeleton />;
    }
    return (
      <RallyPlaying
        userGame={userGame}
        handleChangePage={handleChangePage}
        fetchUserGames={fetchUserGames}
      />
    );
  };

  return (
    <>
      <UserInfo />
      <Row justify="center" className={styles.topContent}>
        <Button
          className={styles.btnRally}
          onClick={() => router.push(PATHS.rallyCreateInfo)}
        >
          ラリーを作る
        </Button>
      </Row>

      <CollapseWrapper
        title={`作成したグランドラリー (${series?.meta?.count ?? 0})`}
        isDefaultActive
      >
        {renderSeries()}
      </CollapseWrapper>

      <CollapseWrapper
        title={`作成したラリー (${userGame?.meta?.count ?? 0})`}
        isDefaultActive
      >
        {renderGames()}
      </CollapseWrapper>

      {/* <CollapseWrapper title={`フォロワー一覧(${follower?.meta?.count ?? 0})`}>
        <Follower
          follower={follower}
          handleChangePage={handleChangePage}
          handleFollowUser={handleFollowUser}
        />
      </CollapseWrapper>
      <CollapseWrapper title="設定（非公開情報）">
        <SettingCreator setting={setting} />
      </CollapseWrapper> */}
    </>
  );
};

export default CreatorInformation;

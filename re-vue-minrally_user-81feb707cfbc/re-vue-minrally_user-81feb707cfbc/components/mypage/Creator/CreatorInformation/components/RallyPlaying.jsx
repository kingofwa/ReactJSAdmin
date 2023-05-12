import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { favoriteGame, unFavoriteGame } from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { List } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useContext } from "react";
import { deleteDraftGame } from "@services/game";
import styles from "../style.module.scss";
import RallyPlayingItem from "./RallyPlayingItem";

const RallyPlaying = ({ userGame, handleChangePage, fetchUserGames }) => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const auth = useAuth();
  const router = useRouter();

  const handleFavoriteRally = id => {
    if (auth?.isLoggedIn) {
      showLoadingAnim();
      favoriteGame({ game_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            fetchUserGames();
          }
        })
        .finally(hideLoadingAnim());
    } else {
      router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    }
  };

  const handleUnfavoriteRally = id => {
    showLoadingAnim();
    unFavoriteGame(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          fetchUserGames();
        }
      })
      .finally(hideLoadingAnim());
  };

  const handleDeleteTrash = (id) => {
    showLoadingAnim();
    deleteDraftGame(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          fetchUserGames();
        }
      })
      .finally(hideLoadingAnim());
  }
  return (
    <List
      // className={styles.list}
      className={size(userGame?.data) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      pagination={
        !!userGame?.data?.length && {
          pageSize: 5,
          total: userGame?.meta?.count,
          onChange: page => handleChangePage(page, "games")
        }
      }
      dataSource={userGame?.data}
      renderItem={(item, index) => (
        <RallyPlayingItem
          item={item}
          key={index}
          handleFavoriteRally={handleFavoriteRally}
          handleUnfavoriteRally={handleUnfavoriteRally}
          handleDeleteTrash={handleDeleteTrash}
        />
      )}
    // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default RallyPlaying;

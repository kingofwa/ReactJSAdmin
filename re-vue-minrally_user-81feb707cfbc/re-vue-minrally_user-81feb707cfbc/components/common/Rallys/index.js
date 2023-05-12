// Default list rally data

import { TOP_TYPE } from "@config/constants";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import {
  favoriteGame,
  unFavoriteGame,
  favoriteSeri,
  unFavoriteSeri
} from "@services/profile";
import { updateReaction } from "@utils/reaction";
import { List, message } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import RallyItem from "./RallyItem";
import styles from "./styles.module.scss";

const ListRallyDefault = ({ layout, data, type, isSeries }) => {
  const router = useRouter();
  const auth = useAuth();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [isLayout, setIsLayout] = useState(styles.grid);
  const [listRally, setListRally] = useState([]);

  useEffect(() => {
    setListRally(data);
  }, [data]);

  const goDetail = id => {
    if (isSeries) {
      router.push(`${PATHS.serie}/${id}`);
    } else {
      router.push(`${PATHS.rally}/${id}`);
    }
  };

  const goProfile = id => {
    router.push(PATHS.profileCreatorRally.replace(/\[id\]/, id));
  };

  useEffect(() => {
    if (layout === "single") setIsLayout(styles.single);
    else if (layout === "grid") setIsLayout(styles.grid);
    else setIsLayout(styles.list);
  }, [layout]);

  const handleFavorite = async id => {
    try {
      if (auth.isLoggedIn) {
        showLoadingAnim();
        if (!isSeries) {
          await favoriteGame({ game_id: id });
        } else {
          await favoriteSeri({ serie_id: id });
        }
      }
      const newArray = updateReaction(
        listRally,
        id,
        "is_favorite",
        "number_of_favorites"
      );
      setListRally([...newArray]);
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
    }
  };

  const handleUnfavorite = async id => {
    try {
      if (auth.isLoggedIn) {
        showLoadingAnim();
        if (!isSeries) {
          await unFavoriteGame(id);
        } else {
          await unFavoriteSeri(id);
        }
      }
      const newArray = updateReaction(
        listRally,
        id,
        "is_favorite",
        "number_of_favorites"
      );
      setListRally([...newArray]);
    } catch (error) {
      message.error(error);
    } finally {
      hideLoadingAnim();
    }
  };

  return (
    <div className={isLayout}>
      <List
        dataSource={listRally}
        split={false}
        renderItem={(item, index) => (
          <RallyItem
            item={item}
            goDetail={goDetail}
            goProfile={goProfile}
            rank={type === TOP_TYPE.RANK ? index + 1 : ""}
            handleFavorite={handleFavorite}
            handleUnfavorite={handleUnfavorite}
            isGrandRally={isSeries}
          />
        )}
        className={size(listRally) === 0 && styles.listNoData}
      />
    </div>
  );
};

export default ListRallyDefault;

import { TOP_TYPE } from "@config/constants";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { favoriteSeri, unFavoriteSeri } from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { updateReaction } from "@utils/reaction";
import { List } from "antd";
import { size } from "lodash";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import RallyItem from "./RallyItem";
import styles from "./styles.module.scss";

const ListGrandRallyDefault = ({ layout, data, type }) => {
  const router = useRouter();
  const auth = useAuth();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const [isLayout, setIsLayout] = useState(styles.grid);
  const [listGrandRally, setListGrandRally] = useState([]);

  useEffect(() => {
    setListGrandRally(data);
  }, [data]);

  const goDetail = serieId => {
    router.push({
      pathname: PATHS.series,
      query: { id: serieId }
    });
  };

  const goProfile = id => {
    router.push(PATHS.profilePlayerRally.replace(/\[id\]/, id));
  };

  useEffect(() => {
    if (layout === "single") setIsLayout(styles.single);
    else if (layout === "grid") setIsLayout(styles.grid);
    else setIsLayout(styles.list);
  }, [layout]);

  const handleFavorite = id => {
    if (auth.isLoggedIn) {
      showLoadingAnim();
      favoriteSeri({ serie_id: id })
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = updateReaction(
              listGrandRally,
              id,
              "is_favorite",
              "number_of_favorites"
            );
            setListGrandRally([...newArray]);
          }
        })
        .finally(hideLoadingAnim());
    } else {
      const newArray = updateReaction(
        listGrandRally,
        id,
        "is_favorite",
        "number_of_favorites"
      );
      setListGrandRally([...newArray]);
    }
  };

  const handleUnfavorite = id => {
    if (auth.isLoggedIn) {
      showLoadingAnim();
      unFavoriteSeri(id)
        .then(res => {
          if (res.status === STATUS_RESPONSE.success) {
            const newArray = updateReaction(
              listGrandRally,
              id,
              "is_favorite",
              "number_of_favorites"
            );
            setListGrandRally([...newArray]);
          }
        })
        .finally(hideLoadingAnim());
    } else {
      const newArray = updateReaction(
        listGrandRally,
        id,
        "is_favorite",
        "number_of_favorites"
      );
      setListGrandRally([...newArray]);
    }
  };

  return (
    <div className={isLayout}>
      <List
        dataSource={listGrandRally}
        split={false}
        renderItem={(item, index) => (
          <RallyItem
            item={item}
            goDetail={goDetail}
            goProfile={goProfile}
            rank={type === TOP_TYPE.RANK ? index + 1 : ""}
            handleFavorite={handleFavorite}
            handleUnfavorite={handleUnfavorite}
            isGrandRally
          />
        )}
        className={size(listGrandRally) === 0 && styles.listNoData}
        // locale={{ emptyText: "データがありません。" }}
      />
    </div>
  );
};

export default ListGrandRallyDefault;

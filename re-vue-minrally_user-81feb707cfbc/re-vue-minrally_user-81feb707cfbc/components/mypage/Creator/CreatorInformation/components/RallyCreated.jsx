import { LoaderContext } from "@contexts/loader";
import { favoriteSeri, unFavoriteSeri } from "@services/profile";
import { STATUS_RESPONSE } from "@utils/constants";
import { List } from "antd";
import { size } from "lodash";
import { useContext } from "react";
import { deleteSerie } from "@services/seri";
import RallyCreatedItem from "./RallyCreatedItem";
import styles from "../style.module.scss";

const RallyCreated = ({
  series,
  handleChangePage,
  userId,
  fetchUserSeries
}) => {
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);

  const handleFavoriteSeri = id => {
    showLoadingAnim();
    favoriteSeri({ serie_id: id })
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          fetchUserSeries();
        }
      })
      .finally(hideLoadingAnim());
  };

  const handleUnFavoriteSeri = id => {
    showLoadingAnim();
    unFavoriteSeri(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          fetchUserSeries();
        }
      })
      .finally(hideLoadingAnim());
  };
  const handleDeleteTrash = (id) => {
    showLoadingAnim();
    deleteSerie(id)
      .then(res => {
        if (res.status === STATUS_RESPONSE.success) {
          fetchUserSeries();
        }
      })
      .finally(hideLoadingAnim());
  }
  return (
    <List
      // className={styles.list}
      className={size(series?.data) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      pagination={
        !!series?.data?.length && {
          pageSize: 5,
          total: series?.meta?.count,
          onChange: page => handleChangePage(page, "series")
        }
      }
      dataSource={series?.data}
      renderItem={(item, index) => (
        <RallyCreatedItem
          item={item}
          key={index}
          userId={userId}
          handleFavoriteSeri={handleFavoriteSeri}
          handleUnFavoriteSeri={handleUnFavoriteSeri}
          handleDeleteTrash={handleDeleteTrash}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default RallyCreated;

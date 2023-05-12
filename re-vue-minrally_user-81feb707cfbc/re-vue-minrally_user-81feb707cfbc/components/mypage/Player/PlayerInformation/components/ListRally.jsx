import React from "react";
import { List } from "antd";
import { size } from "lodash";
import styles from "../style.module.scss";
import RallyItem from "./RallyItem";

const ListRally = ({ rallies, unfavoriteGame, isSeries }) => {
  return (
    <List
      className={size(rallies) > 0 ? styles.list : styles.listNoData}
      itemLayout="vertical"
      dataSource={rallies}
      renderItem={(item, index) => (
        <RallyItem
          item={item}
          key={index}
          unfavoriteGame={unfavoriteGame}
          isSeries={isSeries}
        />
      )}
      // locale={{ emptyText: "データがありません。" }}
    />
  );
};

export default ListRally;

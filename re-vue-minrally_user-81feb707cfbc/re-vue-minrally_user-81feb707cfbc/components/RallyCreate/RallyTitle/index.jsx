import React from "react";
import styles from "./style.module.scss";

const RallyTitle = ({ content }) => {
  return <div className={styles.title}>{content}</div>;
};

export default RallyTitle;

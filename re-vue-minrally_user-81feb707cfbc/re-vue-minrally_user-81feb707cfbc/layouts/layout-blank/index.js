import React from "react";
import styles from "./style.module.scss";

const LayoutBlank = ({ children }) => {
  return (
    <div className="default-container">
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default LayoutBlank;

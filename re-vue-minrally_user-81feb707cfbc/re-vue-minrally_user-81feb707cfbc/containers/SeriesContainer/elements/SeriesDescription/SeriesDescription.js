import { useState } from "react";
import styles from "./SeriesDescription.module.scss";

const SeriesDescription = ({ title = "", description = "" }) => {
  const [collapse, setCollapse] = useState(false);

  const onClickCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <div className={styles.seriesItem}>
        <div className={styles.rowTitle} onClick={onClickCollapse}>
          <p className={styles.title}>{title}</p>
          <div className={styles.collapse}>
            {collapse ? (
              <img
                src="/icons/ic-up.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            ) : (
              <img
                src="/icons/ic-down.svg"
                alt="collapse"
                className={styles.collapseIcon}
              />
            )}
          </div>
        </div>
        {collapse && <div className={styles.content}>{description}</div>}
      </div>
    </>
  );
};

export default SeriesDescription;

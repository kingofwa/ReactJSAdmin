import styles from "./RallyDescription.module.scss";

const RallyDescription = ({ game }) => {
  return (
    <>
      <div className={styles.rallyDescription}>
        <div className={styles.rowTitle}>
          <p className={styles.title}>ラリー説明</p>
        </div>
        <div className={styles.content}>{game?.description}</div>
      </div>
    </>
  );
};

export default RallyDescription;

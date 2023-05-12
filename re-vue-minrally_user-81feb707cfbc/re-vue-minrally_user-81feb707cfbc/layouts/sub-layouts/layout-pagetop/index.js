import styles from "./style.module.scss";

const LayoutPageTop = ({ children }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
      {/* <PageTopFooter /> */}
    </>
  );
};

export default LayoutPageTop;

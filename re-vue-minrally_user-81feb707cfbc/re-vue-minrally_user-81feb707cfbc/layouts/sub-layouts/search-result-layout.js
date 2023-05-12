// eslint-disable-next-line import/no-unresolved
import styles from "../styles.module.scss";

const SearchResultLayout = ({ children }) => {
  return (
    <>
      <section className="main-section">
        <div className={styles.main}>{children}</div>
      </section>
    </>
  );
};

export default SearchResultLayout;

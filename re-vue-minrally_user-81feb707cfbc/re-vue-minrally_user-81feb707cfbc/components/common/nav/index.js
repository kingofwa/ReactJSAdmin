import styles from "./index.module.scss";

const Nav = ({ title, children }) => {
  return (
    <div className={styles.nav}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default Nav;

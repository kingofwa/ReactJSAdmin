import Tab from "@components/common/tab";
import { LOGIN_TAB } from "@config/constants";
import styles from "./style.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <>
      <div className={styles.tabWrapper}>
        <Tab tabs={LOGIN_TAB} className={styles.tab} />
      </div>
      <div className={styles.children}>{children}</div>
    </>
  );
};

export default AuthLayout;

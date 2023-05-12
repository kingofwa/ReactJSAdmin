import Header from "@components/common/header";
import styles from "./style.module.scss";

const PrivacyPolicyLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default PrivacyPolicyLayout;

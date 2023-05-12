import Link from "next/link";
import styles from "./styles.module.scss";

const HeaderSiteLogo = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <img src="/h-logo.jpg" alt="logo" />
      </a>
    </Link>
  );
};

export default HeaderSiteLogo;

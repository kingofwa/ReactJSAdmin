import PATHS from "@config/paths";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./style.module.scss";

const Tab = () => {
  const router = useRouter();
  const classLogin = router.pathname === PATHS.login ? styles.active : "";
  const classSignup =
    router.pathname === PATHS.signup || router.pathname === PATHS.userInfo
      ? styles.active
      : "";

  return (
    <div className={styles.tab}>
      <Link href={PATHS.signup}>
        <a className={classSignup}>新規登録</a>
      </Link>
      <Link href={PATHS.login}>
        <a className={classLogin}>ログイン</a>
      </Link>
    </div>
  );
};

export default Tab;

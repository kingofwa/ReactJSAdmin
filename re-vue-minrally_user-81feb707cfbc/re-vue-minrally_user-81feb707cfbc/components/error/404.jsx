import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.logo}>
        <img src="/img/sorry.png" alt="google-logo" />
      </div>
      <p className={styles.title}>お探しのページが見つかりませんでした。</p>
      <Link type="primary" href="/">
        <a className={styles.btnGohome}>トップページへ戻る</a>
      </Link>
    </div>
  );
};

export default NotFound;

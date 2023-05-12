import { Result } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const NotAuthorized = () => {
  return (
    <Result
      className={styles.result}
      status="403"
      title="401"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Link type="primary" href="/">
          <a className={styles.btnGohome}>Back Home</a>
        </Link>
      }
    />
  );
};

export default NotAuthorized;

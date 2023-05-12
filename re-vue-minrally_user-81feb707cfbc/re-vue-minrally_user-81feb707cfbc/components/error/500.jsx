import { Result } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const ErrorServer = () => {
  return (
    <Result
      className={styles.result}
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Link type="primary" href="/">
          <a className={styles.btnGohome}>Back Home</a>
        </Link>
      }
    />
  );
};

export default ErrorServer;

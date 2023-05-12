import { Result } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const NotFound = () => {
  return (
    <Result
      className={styles.result}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link type="primary" href="/">
          <a className={styles.btnGohome}>Back Home</a>
        </Link>
      }
    />
  );
};

export default NotFound;

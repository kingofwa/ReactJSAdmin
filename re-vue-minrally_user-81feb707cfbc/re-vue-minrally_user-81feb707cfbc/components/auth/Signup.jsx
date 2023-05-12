import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import { Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./style.module.scss";

const Signup = () => {
  const router = useRouter();

  // const onSignUpTwitter = () => {
  //   const signUpRoute = `${PATHS.signUpTwitter}`;
  //   router.push(signUpRoute);
  // };

  const onSignUpLine = () => {
    const signUpRoute = `${PATHS.signUpLine}`;
    router.push(signUpRoute);
  };

  const onSignUpGoogle = () => {
    const signUpRoute = `${PATHS.signUpGoogle}`;
    router.push(signUpRoute);
  };

  return (
    <div className={styles.authForm}>
      <Row className={styles.helpText}>SNSアカウントで新規登録</Row>
      {/* <CustomButton
        className={styles.btnTwitter}
        onClick={onSignUpTwitter}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/twitter-logo.png"
          alt="twitter-logo"
        />
        Twitterで新規登録
      </CustomButton> */}
      <CustomButton
        className={styles.btnLine}
        onClick={onSignUpLine}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/line-logo.png"
          alt="line-logo"
        />
        LINEで新規登録
      </CustomButton>

      <CustomButton
        className={styles.btnGoogle}
        onClick={onSignUpGoogle}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/google-logo.svg"
          alt="google-logo"
        />
        Googleで新規登録
      </CustomButton>

      <div className={styles.description}>
        新規登録をした場合、
        <br />
        <Link type="primary" href={PATHS.termsOfService}>
          <a>利用規約</a>
        </Link>
        {/* <span>利用規約</span> */}
        に同意するものとします。
      </div>
    </div>
  );
};

export default Signup;

/* eslint-disable camelcase */
import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import { Row, Spin } from "antd";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/auth";
import { getUserInfo } from "@services/user/info";
import { setUserIsRegister } from "@utils/storage/user";
import { useEffect } from "react";
import styles from "./style.module.scss";

const LoginLoading = () => {
  const auth = useAuth();
  const router = useRouter();

  const getInfo = async () => {
    const {
      accessToken,
      client,
      uid,
      expiry,
      sns_oauth_and_registered,
      redirectTo
    } = router.query;
    const credentials = {
      accessToken,
      client,
      uid,
      expiry
    };
    auth.logUserIn({ credentials, user: {} });
    try {
      const user = await getUserInfo();
      auth.logUserIn({ credentials, user });
      if (sns_oauth_and_registered === "false") {
        router.push(PATHS.userInfo);
        setUserIsRegister(false);
      } else {
        setUserIsRegister(true);
        router.push(redirectTo || PATHS.home);
      }
    } catch (error) {
      // message.error(error);
    }
  };

  // useEffect(() => {
  //   const isNoRegister = getIsRegister() === "false";
  //   if (auth.isLoggedIn && isNoRegister) {
  //     router.push(PATHS.userInfo);
  //   }
  // }, [router]);

  useEffect(() => {
    if (router.query.uid) {
      getInfo();
    }
  }, [router]);

  return (
    <Spin spinning>
      <div className={styles.authForm}>
        <Row className={styles.helpText}>SNSアカウントでログイン</Row>
        {/* <CustomButton className={styles.btnTwitter} variant="community">
          <img
            className={styles.logo}
            src="/img/auth/twitter-logo.png"
            alt="twitter-logo"
          />
          Twitterでログイン
        </CustomButton> */}
        <CustomButton className={styles.btnLine} variant="community">
          <img
            className={styles.logo}
            src="/img/auth/line-logo.png"
            alt="line-logo"
          />
          LINEでログイン
        </CustomButton>
        <CustomButton className={styles.btnGoogle} variant="community">
          <img
            className={styles.logo}
            src="/img/auth/google-logo.svg"
            alt="google-logo"
          />
          Googleでログイン
        </CustomButton>
      </div>
    </Spin>
  );
};

export default LoginLoading;

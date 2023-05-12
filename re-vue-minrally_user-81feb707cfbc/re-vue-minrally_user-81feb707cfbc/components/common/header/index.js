/* eslint-disable camelcase */
import HeaderSiteLogo from "@components/common/header-site-logo";
import { useEffect } from "react";
import { getUserInfo } from "@services/user/info";
import { useRouter } from "next/router";
import { useAuth } from "@contexts/auth";
import PATHS from "@config/paths";
import { message } from "antd";
import { getIsRegister, setUserIsRegister } from "@utils/storage/user";
import { STATUS_CREATOR } from "@utils/constants";
import styles from "./index.module.scss";

const Header = () => {
  const auth = useAuth();
  const router = useRouter();
  const getInfo = async () => {
    const { accessToken, client, uid, expiry, sns_oauth_and_registered } =
      router.query;
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
      }
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    const isNoRegister = getIsRegister() === "false";
    if (auth.isLoggedIn && PATHS.userInfo !== router.asPath && isNoRegister) {
      router.push(PATHS.userInfo);
    }
  }, [router]);

  useEffect(() => {
    if (router.query.uid) {
      getInfo();
    }
  }, [router]);

  const goToPage = path => {
    let redirectPath = path;
    if (path === PATHS.rallyCreateInfo) {
      const statusCreator = auth?.user?.creator_application?.status;
      if (auth.isLoggedIn) {
        if (statusCreator === STATUS_CREATOR.approved)
          redirectPath = PATHS.rallyCreateInfo;
        else redirectPath = PATHS.mypageCreator;
      } else redirectPath = PATHS.login;
    }
    router.push(redirectPath);
  };

  return (
    <header className={styles.headerWrapper}>
      <span className={styles.header}>
        <h1 className={styles.logo}>
          <HeaderSiteLogo />
        </h1>
        <div
          className={styles.menu}
          onClick={() => goToPage(PATHS.rallyCreateInfo)}
        >
          <img
            src="/icons/ic-add.svg"
            alt="add-icon"
            className={styles.menuIcon}
          />
          <span className={styles.menuText}>ラリー作成</span>
        </div>
      </span>
    </header>
  );
};

export default Header;

import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { LoaderContext } from "@contexts/loader";
import { getUserInfo } from "@services/user/info";
import { Avatar, Button, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useContext } from "react";
import styles from "./style.module.scss";

const Head = () => {
  const router = useRouter();
  const { showLoadingAnim, hideLoadingAnim } = useContext(LoaderContext);
  const isPlayer = router.pathname === PATHS.mypagePlayer;
  const auth = useAuth();
  const [userInfo, setUserInfo] = useState();

  const goToProfile = () => {
    const path = isPlayer
      ? `${PATHS.profilePlayer}/${auth?.user.id ?? userInfo?.id}`
      : `${PATHS.profileCreator}/${auth?.user.id ?? userInfo?.id}`;
    router.push(path);
  };
  const getInfo = async () => {
    showLoadingAnim();
    const { accessToken, client, uid, expiry } = router.query;
    const credentials = {
      accessToken,
      client,
      uid,
      expiry
    };
    auth.logUserIn({ credentials, user: {} });
    try {
      const user = await getUserInfo();
      setUserInfo(user);
      auth.logUserIn({ credentials, user });
    } catch (error) {
      message.error(error?.message);
    } finally {
      hideLoadingAnim();
    }
  };

  useEffect(() => {
    if (router.query.uid) {
      getInfo();
    }
  }, [router.query]);

  return (
    <>
      <div className={styles.head}>
        <Avatar
          className={styles.avatar}
          src={auth?.isLoggedIn ? auth?.user?.avatar_url : userInfo?.avatar_url}
        />
        <div className={styles.name}>
          {auth?.isLoggedIn ? auth?.user?.user_name : userInfo?.user_name}
        </div>
        <Button className={styles.btnProfile} onClick={goToProfile}>
          プロフィールページ
        </Button>
      </div>
      <div className={styles.tab}>
        <Link href={PATHS.mypagePlayer}>
          <a className={isPlayer ? styles.active : ""}>プレイヤー情報</a>
        </Link>
        <Link href={PATHS.mypageCreator}>
          <a className={!isPlayer ? styles.active : ""}>クリエイター情報</a>
        </Link>
      </div>
    </>
  );
};

export default Head;

import { CustomButton } from "@components/common/buttons";
import Tab from "@components/common/tab";
import { MYPAGE_PLAYER_CREATOR_TAB } from "@config/constants";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { Skeleton } from "antd";
import useUserInfo from "hooks/useUserInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const avatarDefault = "/img/avatar-holder.svg";
const UserInfo = () => {
  const router = useRouter();
  const userInfo = useUserInfo();

  const auth = useAuth();

  const goProfile = () => {
    let redirectPath;
    if (auth?.user?.is_creator) {
      redirectPath = PATHS.profileCreatorRally.replace(/\[id\]/, userInfo?.id);
    } else {
      redirectPath = PATHS.profilePlayerRally.replace(/\[id\]/, userInfo?.id);
    }
    router.push(redirectPath);
  };

  return (
    <div className={styles.container}>
      {userInfo?.user_name ? (
        <>
          <div className={styles.head}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <img src={userInfo?.avatar_url ?? avatarDefault} alt="avatar" />
              </div>
              <div className={styles.nameWrapper}>
                <span className={styles.name}>{userInfo?.user_name}</span>
                <span className={styles.settingBtn}>
                  <Link
                    href={
                      auth?.user?.is_creator
                        ? PATHS.mypageProfileCreatorSetting
                        : PATHS.mypageProfilePlayerSetting
                    }
                  >
                    <a>
                      <img src="/img/mypage/setting-ic.svg" alt="settingBtn" />
                    </a>
                  </Link>
                </span>
              </div>
            </div>
            <CustomButton className={styles.profileBtn} onClick={goProfile}>
              プロフィール
            </CustomButton>
          </div>
          <div className={styles.followWrap}>
            <div className={styles.follow}>
              <Link href={PATHS.mypagePlayerFollowedUser}>
                <a>
                  <b>{userInfo?.number_of_following ?? 0}</b> フォロー中
                </a>
              </Link>
              <Link href={PATHS.mypagePlayerFollower}>
                <a>
                  <b>{userInfo?.number_of_followers ?? 0}</b> フォロワ―
                </a>
              </Link>
            </div>
            <div className={styles.rally}>
              <Link href={PATHS.mypagePlayerGrandRally}>
                <a>
                  <b>{userInfo?.number_of_played ?? 0}</b> 参加中のラリー
                </a>
              </Link>
              <Link href={PATHS.mypagePlayerLikedRally}>
                <a>
                  <b>{userInfo?.number_of_liked ?? 0}</b> いいねしたラリー
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <Skeleton avatar paragraph={{ rows: 1 }} />
      )}

      <Tab tabs={MYPAGE_PLAYER_CREATOR_TAB} className={styles.tabUserInfo} />
    </div>
  );
};

export default UserInfo;

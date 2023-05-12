/* eslint-disable camelcase */
import { CustomButton, IconButton } from "@components/common/buttons";
import { MESSAGES } from "@config/messages";
import PATHS from "@config/paths";
import { useAuth } from "@contexts/auth";
import { logout } from "@services/session";
import { MESSAGE_DURATION } from "@utils/constants";
// import { getUserInfo } from "@services/user/info";
import { Divider, Drawer, message, Space } from "antd";
import { map } from "lodash";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./navbar.module.scss";

const NAV_MENU = [
  {
    text: "利用規約",
    path: PATHS.termsOfService
  },
  {
    text: "プライバシーポリシー",
    path: PATHS.privacyPolicy
  },
  {
    text: "特定商取引法に基づく表記",
    path: PATHS.specifiedCommercialTransactions
  },
  {
    text: "お問い合わせ",
    path: PATHS.contact
  }
];

const Navbar = ({ isActive }) => {
  const auth = useAuth();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const SEARCH_MENU_NAVBAR = [
    {
      text: "ユーザー検索",
      path: PATHS.searchCreator
    },
    {
      text: "お知らせ",
      path: PATHS.news
    }
  ];

  const CREATOR_MENU_NAVBAR = [
    {
      text: "ラリー作成",
      path: PATHS.rallyCreateInfo
    },
    {
      text: "グランドラリー作成",
      path: auth.user?.is_creator ? PATHS.createSeri : PATHS.mypageCreator
    }
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const goLogin = () => {
    router.push(`${PATHS.login}?redirectTo=${router.asPath}`);
    onClose();
  };

  const goSignUp = () => {
    router.push(PATHS.signup);
    onClose();
  };

  const goToPage = path => {
    router.push(path);
    onClose();
  };

  const handleLogout = async () => {
    try {
      await logout();
      auth.logUserOut();
    } catch (error) {
      message.error(error);
    } finally {
      message.success({
        content: MESSAGES.logoutSuccessfully,
        duration: MESSAGE_DURATION
      });

      if (router.pathname === PATHS.home) {
        window.location.href = PATHS.home;
      } else {
        router.push(PATHS.home);
        onClose();
      }
    }
  };

  const onGoProfile = () => {
    if (auth?.user?.is_creator) {
      router.push(PATHS.profileCreatorRally.replace(/\[id\]/, auth?.user?.id));
    } else {
      router.push(PATHS.profilePlayerRally.replace(/\[id\]/, auth?.user?.id));
    }
    onClose();
  };

  const renderAuthMenu = () => {
    if (auth?.isLoggedIn) {
      return (
        <div className={styles.authMenu}>
          <CustomButton size="middle" variant="primary" onClick={onGoProfile}>
            プロフィール
          </CustomButton>
          <CustomButton
            size="middle"
            onClick={() => {
              router.push(
                auth?.user?.is_creator
                  ? PATHS.mypageProfileCreatorSetting
                  : PATHS.mypageProfilePlayerSetting
              );
              onClose();
            }}
          >
            設定
          </CustomButton>
        </div>
      );
    }
    return (
      <div className={styles.authMenu}>
        <CustomButton size="middle" variant="primary" onClick={goLogin}>
          ログイン
        </CustomButton>
        <CustomButton size="middle" onClick={goSignUp}>
          新規登録
        </CustomButton>
      </div>
    );
  };

  const renderUser = () => {
    if (auth?.isLoggedIn) {
      return (
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img
              src={auth?.user?.avatar_url ?? "/img/mypage/avatar-default.png"}
              alt="avt"
            />
          </div>
          <p className={styles.userName}>{auth?.user?.user_name}</p>
        </div>
      );
    }
    return null;
  };

  const renderMenuItem = (item, isSearch = false) => {
    return (
      <li
        key={item.text}
        className={isSearch ? styles.navSearchItem : styles.navItem}
      >
        {/* <Link> */}
        <span onClick={() => goToPage(item.path)}>{item.text}</span>
        {/* </Link> */}
      </li>
    );
  };

  const renderSearchMenu = () => {
    return (
      <ul className={styles.navSearch}>
        {auth?.isLoggedIn &&
          auth.user?.is_creator &&
          map(CREATOR_MENU_NAVBAR, item => renderMenuItem(item, true))}
        {SEARCH_MENU_NAVBAR.map(item => {
          return renderMenuItem(item, true);
        })}
      </ul>
    );
  };

  const renderNavMenu = () => {
    return (
      <ul className={styles.navSearch}>
        {NAV_MENU.map(item => {
          return renderMenuItem(item);
        })}
      </ul>
    );
  };

  const renderLogOut = () => {
    if (auth?.isLoggedIn) {
      return (
        <>
          <Divider className={styles.divider} />
          <span className={styles.logOut} onClick={handleLogout}>
            ログアウト
          </span>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <IconButton
        className={styles.toggler}
        iconClassName={isActive ? styles.togglerIconActive : styles.togglerIcon}
        onClick={showDrawer}
      />
      <Drawer
        className={styles.drawer}
        placement="right"
        closable
        visible={visible}
        onClose={onClose}
        closeIcon={null}
        extra={
          <Space>
            <IconButton
              onClick={onClose}
              className={styles.toggler}
              iconClassName={styles.closeIcon}
            />
          </Space>
        }
      >
        <div className={styles.navBody}>
          <div>
            {renderUser()}
            {renderAuthMenu()}
            <Divider className={styles.divider} />
            {renderSearchMenu()}
            <Divider className={styles.divider} />
            {renderNavMenu()}
            {renderLogOut()}
          </div>

          <div className={styles.copyright}>©️みんラリ</div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;

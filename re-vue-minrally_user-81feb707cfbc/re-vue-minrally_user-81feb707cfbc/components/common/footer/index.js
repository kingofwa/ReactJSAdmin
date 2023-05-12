import PATHS from "@config/paths";
import { STATUS_CREATOR } from "@utils/constants";
import { useRouter } from "next/router";
import { includes } from "lodash";
import { NotificationContext } from "@contexts/notification";
import { useContext } from "react";
import { useAuth } from "@contexts/auth";
import styles from "./index.module.scss";
import Navbar from "../header/navbar";

const Footer = () => {
  const auth = useAuth();
  const router = useRouter();
  const { isBell } = useContext(NotificationContext);

  const menuLinks = [
    PATHS.termsOfService,
    PATHS.privacyPolicy,
    PATHS.specifiedCommercialTransactions,
    PATHS.contact,
    PATHS.faq
  ];

  const searchItem = {
    label: "検索",
    icon: "/icons/ic-search.svg",
    path: PATHS.searchRally,
    paths: [
      PATHS.searchRally,
      PATHS.searchCreator,
      PATHS.searchResult,
      PATHS.searchRallyResult
    ]
  };

  const MENUS = [
    {
      label: "ホーム",
      icon: "/icons/ic-home.svg",
      path: PATHS.home,
      id: 1,
      paths: [PATHS.home, PATHS.mypageCreator]
    },
    {
      label: "お知らせ",
      icon: "/icons/ic-notification.svg",
      path: PATHS.myNews,
      isBell: true,
      id: 2,
      paths: [PATHS.myNews, PATHS.news]
    },
    {
      isFake: true,
      id: 3
    },
    {
      label: "近くのラリー",
      icon: "/icons/ic-location-menu.svg",
      path: PATHS.nearByCheckin,
      id: 4,
      paths: [PATHS.nearByCheckin]
    }
  ];

  // TODO: temp
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

  const renderFooterItem = (item, isCenter) => {
    const isActive = includes(item?.paths, router?.pathname);

    if (item?.isFake) {
      return <div className={styles.divFake} />;
    }
    return (
      <div
        className={isCenter ? styles.itemWrapperCenter : styles.itemWrapper}
        key={item?.id}
        onClick={() => goToPage(item.path)}
      >
        <img
          src={isActive ? `/active${item.icon}` : item.icon}
          alt="footer-icon"
        />
        <p className={isActive && styles.activeLabel}>{item.label}</p>

        {item?.isBell && isBell && (
          <span className={isBell && styles.bell}>
            <p className={styles.animation} />
          </span>
        )}
      </div>
    );
  };

  const isActiveMenu = includes(menuLinks, router?.pathname);

  return (
    <footer className={styles.footer}>
      <div className={styles.menu}>
        {MENUS.map(item => {
          return renderFooterItem(item);
        })}

        <div className={styles.itemWrapper}>
          <Navbar isActive={isActiveMenu} />
          <p className={isActiveMenu && styles.activeLabel}>メニュー</p>
        </div>
        {renderFooterItem(searchItem, true)}
      </div>
    </footer>
  );
};

export default Footer;

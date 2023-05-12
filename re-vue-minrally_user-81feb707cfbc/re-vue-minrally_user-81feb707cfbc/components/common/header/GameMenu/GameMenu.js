import { head, includes } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./style.module.scss";

const HeaderMenu = ({ menus }) => {
  const router = useRouter();
  const id = router?.query?.id;
  return (
    <div className={styles.tab}>
      {menus.map(menu => {
        const path = router.pathname.slice(0, router.pathname.length - 5);
        const isActive = includes(menu.paths, path);
        return (
          <Link href={`${head(menu.paths)}/${id}`} key={menu.key}>
            <a className={isActive ? styles.active : styles.nonActive}>
              <span>{menu.label}</span>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default HeaderMenu;

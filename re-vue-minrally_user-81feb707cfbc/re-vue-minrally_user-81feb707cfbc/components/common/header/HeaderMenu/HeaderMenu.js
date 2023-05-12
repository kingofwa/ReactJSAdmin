import { head, includes } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "./style.module.scss";

const HeaderMenu = ({ menus }) => {
  const router = useRouter();

  return (
    <div className={styles.tab}>
      {menus.map(menu => {
        const isActive = includes(menu.paths, router.pathname);
        return (
          <Link href={head(menu.paths)} key={menu.key}>
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

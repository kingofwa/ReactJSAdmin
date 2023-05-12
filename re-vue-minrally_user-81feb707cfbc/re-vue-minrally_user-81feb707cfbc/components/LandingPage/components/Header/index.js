/* eslint-disable jsx-a11y/anchor-is-valid */
// TODO: change tag a

import { CloseOutlined } from "@ant-design/icons";
import { DURATION_ANIMATION, MEDIUM_DEVICE } from "@utils/landing-page";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import styles from "./style.module.scss";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  const [heightHeader, setHeightHeader] = useState();
  const ref = useRef(null);

  const toggleMenu = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= MEDIUM_DEVICE) setIsShow(!isShow);
    }
  };

  // prevent body from scrolling when a menu open
  useEffect(() => {
    if (isShow) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isShow]);

  useEffect(() => {
    setHeightHeader(ref.current.clientHeight);
  }, []);

  return (
    <>
      <div
        className={styles.header}
        ref={ref}
        data-aos="fade-zoom-in-down"
        data-aos-delay="500"
        data-aos-offset="0"
      >
        <div className={styles.logo}>
          <a href="/lp">
            <img src="/img/landing-page/logo.png" alt="logo" />
          </a>
        </div>

        <div>
          <div className={styles.toggleIcon} onClick={toggleMenu}>
            {isShow ? (
              <CloseOutlined />
            ) : (
              <img src="/img/landing-page/ic-menu.svg" alt="menu" />
            )}
          </div>

          <nav
            className={isShow ? ` ${styles.nav} ${styles.isShow} ` : styles.nav}
          >
            <ul className={styles.menu}>
              <li>
                <Link
                  to="top-defines"
                  spy
                  smooth
                  offset={-heightHeader}
                  duration={DURATION_ANIMATION}
                  onClick={() => toggleMenu()}
                >
                  みんラリとは
                </Link>
              </li>
              <li>
                <Link
                  to="guide"
                  spy
                  smooth
                  offset={-heightHeader}
                  duration={DURATION_ANIMATION}
                  onClick={() => toggleMenu()}
                >
                  使い方
                </Link>
              </li>
              {/* <li>
                <Link
                  to="accept-rally"
                  spy
                  smooth
                  offset={-heightHeader}
                  duration={DURATION_ANIMATION}
                  className={styles.special}
                >
                  <img
                    src="/img/landing-page/ic_vector.png"
                    alt="icon"
                    className={styles.rightIc}
                  />
                  事前登録
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
      {/* <div className={styles.register}>
        <Link
          to="accept-rally"
          spy
          smooth
          offset={-heightHeader}
          duration={DURATION_ANIMATION}
        >
          <img
            src="/img/landing-page/ic_vector.png"
            alt="icon"
            className={styles.rightIc}
          />
          <span>事前登録</span>
        </Link>
      </div> */}
    </>
  );
};

export default Header;

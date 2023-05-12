import { DELAY_ANIMATION, DURATION_ANIMATION } from "@utils/landing-page";
import { Row } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Row className={styles.footerMain}>
        <div className={styles.btnGroup}>
          <Link href="https://twitter.com/37rally_seiha">
            <a>
              <img
                src="/img/landing-page/footer-btn-1.png"
                alt="twitter-logo-1"
              />
            </a>
          </Link>

          <Link href="https://twitter.com/37rally_touha">
            <a>
              <img
                src="/img/landing-page/footer-btn-2.png"
                alt="twitter-logo-2"
              />
            </a>
          </Link>

          <Link href="https://note.com/37rally/m/m97b4e1051c65">
            <a>
              <img
                src="/img/landing-page/footer-btn-3.png"
                alt="twitter-logo-3"
              />
            </a>
          </Link>
        </div>
      </Row>

      <Row justify="center" align="middle">
        <div
          className={styles.logo}
          data-aos="fade-up"
          data-aos-delay={DELAY_ANIMATION}
          duration={DURATION_ANIMATION}
        >
          <img src="/img/landing-page/logo.png" alt="logo" />
          <span>©37rally.com</span>
        </div>
      </Row>
    </div>
  );
};

export default Footer;

/* eslint-disable import/no-unresolved */
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import Banner from "@components/LandingPage/components/Banner";
import Footer from "@components/LandingPage/components/Footer";
import Header from "@components/LandingPage/components/Header";
import { MEDIUM_DEVICE } from "@utils/landing-page";
import { BackTop } from "antd";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import { useEffect } from "react";
import styles from "./style.module.scss";

const LayoutLandingPage = ({ children }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init({
        easing: "ease-out-cubic",
        once: false,
        offset: 50,
        disable: window.innerWidth <= MEDIUM_DEVICE
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          みんなで楽しむチェックインラリー｜みんラリ 【2023年リリース予定】
        </title>
        <meta
          name="viewport"
          content="user-scalable=no,initial-scale=1,maximum-scale=1"
        />
        <meta
          property="og:title"
          content="みんなで楽しむチェックインラリー｜みんラリ 【2023年リリース予定】"
          key="title"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_APP_HOST}/img/landing-page/og_img.png`}
        />

        <meta
          property="og:description"
          content="「ラリーマスター」になり、自分が好きなことをラリーにすることができます。ラリーマスター事前登録受付中！"
        />

        {/* Twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="みんなで楽しむチェックインラリー｜みんラリ 【2023年リリース予定】"
        />
        <meta
          name="twitter:description"
          content="「ラリーマスター」になり、自分が好きなことをラリーにすることができます。ラリーマスター事前登録受付中！"
        />
        <meta name="twitter:site" content="@fogsnail" />
        <meta
          name="twitter:image"
          content={`${process.env.NEXT_PUBLIC_APP_HOST}/img/landing-page/og_img.png`}
        />
        <meta name="twitter:creator" content="@fogsnail" />
      </Head>

      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Banner />
          {children}
        </div>
        <Footer />
        <BackTop className={styles.antBackTop}>
          <div className={styles.btnScrollToTop}>
            <VerticalAlignTopOutlined />
          </div>
        </BackTop>
      </div>
    </>
  );
};

export default LayoutLandingPage;

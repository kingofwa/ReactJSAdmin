import {
  DURATION_ANIMATION,
  HEIGHT_HEADER_MB,
  HEIGHT_HEADER_PC,
  MEDIUM_DEVICE
} from "@utils/landing-page";
import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import BlockWrapper from "../BlockWrapper";
import styles from "./styles.module.scss";

const GUIDE_LIST = [
  {
    id: 0,
    title: "アカウント登録",
    img: "/img/landing-page/social-2.png",
    content:
      "LINEアカウント・Twitterアカウント・Googleアカウントのいずれかと連携してアカウント登録をします。"
  },
  {
    id: 1,
    title: "チェックインラリーを探す",
    img: "/img/landing-page/map.png",
    content:
      "自分の好きな分野や場所、住んでいる地域などからチェックインラリーを探すことができます。"
  },
  {
    id: 2,
    title: "チェックインラリーに参加",
    img: "/img/landing-page/map.png",
    content:
      "好きなチェックインラリーを見つけたら、該当スポットへ行ってチェックインしよう！"
  }
];

function Guide({ isTop }) {
  const [heightHeader, setHeightHeader] = useState();

  const height = () => {
    const heightHeaderLp =
      window.innerWidth <= MEDIUM_DEVICE
        ? -HEIGHT_HEADER_MB
        : -HEIGHT_HEADER_PC;
    setHeightHeader(heightHeaderLp);
  };

  useEffect(() => {
    height();
  }, []);

  return (
    <section
      className={isTop ? `${styles.isTop} ${styles.guide}` : styles.guide}
      id="guide"
    >
      <BlockWrapper isTop={isTop} title="みんラリの使い方">
        <div className={styles.desc} data-aos="fade-up">
          「みんラリ」は、誰でも無料で利用することができます！アカウント登録して、チェックインラリーを見てみましょう！
        </div>
        <Row gutter={{ lg: 70, md: 0 }} className={styles.guideList}>
          {GUIDE_LIST.map(item => (
            <Col
              lg={8}
              md={24}
              sm={24}
              xs={24}
              key={item?.id}
              className={
                item?.id === 2
                  ? `${styles.lastGuideItem} ${styles.guideItem}`
                  : styles.guideItem
              }
              data-aos="fade-up"
              data-aos-duration={DURATION_ANIMATION}
            >
              <div className={styles.itemWrapper}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.imgCover}>
                  <img src={item.img} alt="img" />
                  {item.id === 2 && (
                    <Link
                      to="accept-rally"
                      spy
                      smooth
                      offset={heightHeader}
                      duration={DURATION_ANIMATION}
                      className={styles.checkinBtn}
                    >
                      <img
                        src="/img/landing-page/checkedinBtn.png"
                        alt="checkinImg"
                      />
                    </Link>
                  )}
                </div>
                <div className={styles.content}>{item.content}</div>
              </div>
              {item.id !== 2 && (
                <div className={styles.imgArrow}>
                  <img src="/img/landing-page/arrow.png" alt="arrow" />
                </div>
              )}
            </Col>
          ))}
        </Row>
      </BlockWrapper>
    </section>
  );
}

export default Guide;

import { Col, Row } from "antd";
import React from "react";
import { DELAY_ANIMATION, DURATION_ANIMATION } from "@utils/landing-page";
import BlockWrapper from "../BlockWrapper";
import styles from "./styles.module.scss";

const SPOT_CHECKIN = [
  {
    id: 1,
    img: "/img/landing-page/checkin_01.png",
    name: "都道府県47制覇ラリー"
  },
  {
    id: 2,
    img: "/img/landing-page/checkin_02.png",
    name: "鎌倉殿の13人にゆかりの土地をめぐるチェックインラリー"
  },
  {
    id: 3,
    img: "/img/landing-page/checkin_03.png",
    name: "総距離10,000km超え！全国の記念館めぐり"
  },
  {
    id: 4,
    img: "/img/landing-page/checkin_04.png",
    name: "東京六大学ラリー"
  },
  {
    id: 5,
    img: "/img/landing-page/checkin_05.png",
    name: "５大ドーム制覇ラリー"
  },
  {
    id: 6,
    img: "/img/landing-page/checkin_06.png",
    name: "ミシュランガイド東京2022三つ星レストランラリー"
  }
];
const CheckinRally = ({ isTop }) => {
  return (
    <section
      className={
        isTop ? `${styles.isTop} ${styles.checkinRally}` : styles.checkinRally
      }
    >
      <BlockWrapper
        isTop={isTop}
        title="みんラリのチェックインラリー紹介"
        is18px
      >
        <Row className={styles.desc} data-aos="fade-up">
          みんラリでは、好きな地域・分野・場所など、さまざまなチェックインラリーを作成することができます。
          <br />
          チェックインラリー参考例をいくつかご紹介！
        </Row>

        <Row
          gutter={{ lg: 70, md: 23, sm: 23, xs: 23 }}
          className={styles.listSpot}
          data-aos="fade-up"
        >
          {SPOT_CHECKIN.map(item => (
            <Col
              lg={8}
              md={12}
              sm={12}
              xs={12}
              className={styles.spotItem}
              key={item?.id}
              data-aos="zoom-out-up"
              data-aos-duration={DURATION_ANIMATION}
              data-aos-delay={DELAY_ANIMATION}
            >
              <div className={styles.imgRally}>
                {item?.img && <img src={item.img} alt="img-spot" />}
              </div>
              <div className={styles.descRally}>{item?.name}</div>
            </Col>
          ))}
        </Row>
        <Row
          className={styles.planWapper}
          justify="center"
          data-aos="fade-up"
          data-aos-delay={DELAY_ANIMATION}
        >
          <div className={styles.planNote}>様々なラリーを展開予定…！</div>
          <img
            src="/img/landing-page/img-penguin-pc.png"
            alt="img-penguin"
            className={styles.imgPC}
          />
          <img
            src="/img/landing-page/img-penguin-mb-2.png"
            alt="img-penguin"
            className={styles.imgMb}
          />
        </Row>
      </BlockWrapper>
    </section>
  );
};

export default CheckinRally;

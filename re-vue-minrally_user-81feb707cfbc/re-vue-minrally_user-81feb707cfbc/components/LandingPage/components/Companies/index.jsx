import PATHS from "@config/paths";
import { DURATION_ANIMATION } from "@utils/landing-page";
import { Button, Col, Row } from "antd";
import { useRouter } from "next/router";
import BlockWrapper from "../BlockWrapper";
import styles from "./style.module.scss";

const Companies = ({ isTop }) => {
  const router = useRouter();
  // const URLForm =
  //   "https://docs.google.com/forms/d/e/1FAIpQLSdHOOhfsBuq7SazUp9bV4c_Ktvx2DKREsyd2YogWPeD3pvFjQ/viewform";
  return (
    <div
      className={
        isTop ? `${styles.isTop} ${styles.companies}` : styles.companies
      }
    >
      <BlockWrapper
        isTop={isTop}
        title="企業や自治体、商店街のみなさまへ"
        is18px
      >
        <Row
          className={styles.desc}
          data-aos="zoom-out-up"
          data-aos-duration={DURATION_ANIMATION}
        >
          企業オリジナルのチェックインラリーや、自治体に関連したチェックインラリー、商店街でのチェックインラリーイベントなど、
          <br className={styles.onlySp} />
          さまざまなプロモーションなどにご活用いただけるプランをご用意しております。
          <br />
          詳しくは、お問い合わせください。
        </Row>

        <Row
          gutter={[20, 30]}
          className={styles.list}
          data-aos="zoom-out-up"
          data-aos-duration={DURATION_ANIMATION}
        >
          <Col span={8} lg={8} md={12} sm={24} xs={24} className={styles.item}>
            <img src="/img/landing-page/image-8.png" alt="img-8" />
            <div className={styles.content}>
              <span>弊社サービス </span>
              <br />
              <span>「REV-STAMP」</span>
              <br />
              スマートフォンに直接物理的にスタンプをすることで地点・店舗・団体のIDを感知。それぞれのクライアント様のご希望される方法でお客様や所属チームメイトなどのスタンプをためていくことができます。
            </div>
          </Col>
          <Col span={8} lg={8} md={12} sm={24} xs={24} className={styles.item}>
            <img src="/img/landing-page/image-9.png" alt="img-8" />
            <div className={styles.content}>
              <span>弊社イベント実績 </span>
              <br />
              <span>「ミステリアス鉄道ＱＱＱ」</span>
              <br />
              東急線沿線を巡るリアル謎解きゲーム、
              <br />
              東急線謎解きラリー×ペルソナ5 ザ・ロイヤル
              「ミステリアス鉄道ＱＱＱ」を開催しました。
            </div>
          </Col>
          <Col span={8} lg={8} md={12} sm={24} xs={24} className={styles.item}>
            <img src="/img/landing-page/image-10.png" alt="img-8" />
            <div className={styles.content}>
              <span>弊社イベント実績 </span>
              <br />
              <span>「グリコ×イトーヨーカドー宝探しCP」</span>
              <br />
              グリコ×イトーヨーカドータイアップした、宝探しキャンペーン。
              <br className={styles.contentBr} />
              QRスタンプを使い、店舗を巡るラリー。
            </div>
          </Col>
        </Row>

        <Row
          justify="center"
          className={styles.rowBtn}
          data-aos="fade-up"
          duration={DURATION_ANIMATION}
        >
          <Button
            className={styles.btn}
            onClick={() => {
              router.push(PATHS.contact);
            }}
          >
            お問い合わせ
          </Button>
        </Row>
      </BlockWrapper>
    </div>
  );
};

export default Companies;

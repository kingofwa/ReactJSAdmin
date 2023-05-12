import { DURATION_ANIMATION } from "@utils/landing-page";
import { Col, Row } from "antd";
import BlockWrapper from "../BlockWrapper";
import styles from "./styles.module.scss";

const TopCoco = ({ isTop }) => (
  <section className={isTop ? `${styles.isTop} ${styles.main}` : styles.main}>
    <BlockWrapper isTop={isTop} title="みんラリのココが楽しい！">
      <div className={styles.textWrap}>
        チェックインラリーをスマホでいつでもどこでも楽しむことができる「みんラリ」。その楽しいポイントをご紹介！
      </div>
      <Row className={styles.list} gutter={{ lg: 60, sm: 0, md: 0, xs: 0 }}>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className={styles.itemWrap}
          data-aos="fade-right"
          data-aos-duration={DURATION_ANIMATION}
        >
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>
              好きなことを
              <br />
              ラリーにできる！
            </div>
            <div className={styles.itemTextDetail}>
              自分の趣味、好きなことや得意分野に関するおすすめスポットを登録して、あなただけのラリーを作ることができます。
            </div>
          </div>
          <div className={styles.imgBadge}>
            <img src="/img/landing-page/map-badge-1.png" alt="badge" />
          </div>
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className={styles.itemWrap}
          data-aos="fade-left"
          data-aos-duration={DURATION_ANIMATION}
        >
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>
              作ったラリーを
              <br />
              みんなに楽しんでもらえる！
            </div>
            <div className={styles.itemTextDetail}>
              自分の作ったラリーをたくさんの人に楽しんでもらえ、「いいね！」やコメントなどの反応がもらえます。たくさんの「いいね！」や参加者を集めて、ランキング上位を目指そう！
            </div>
          </div>
          <div className={styles.imgBadge}>
            <img src="/img/landing-page/map-badge-2.png" alt="badge" />
          </div>
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className={styles.itemWrap}
          data-aos="fade-right"
          data-aos-duration={DURATION_ANIMATION}
        >
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>
              豊富なジャンルの
              <br />
              ラリーが遊べる！
            </div>
            <div className={styles.itemTextDetail}>
              メジャーなものからマニアックなものまで、豊富なラリーの中からあなたが遊んでみたくなるラリーがきっと見つかります。
            </div>
          </div>
          <div className={styles.imgBadge}>
            <img src="/img/landing-page/map-badge-3.png" alt="badge" />
          </div>
        </Col>
        <Col
          lg={12}
          md={24}
          sm={24}
          xs={24}
          className={styles.itemWrap}
          data-aos="fade-left"
          data-aos-duration={DURATION_ANIMATION}
        >
          <div className={styles.itemText}>
            <div className={styles.itemTitle}>お出かけが楽しくなる！</div>
            <div className={styles.itemTextDetail}>
              自分の作ったラリーをたくさんの人に制覇タイムを競ったり、知らなかった場所に出会えたり、有名なあの人のおすすめスポットに行ってみたり……。
              <br />
              「みんラリ」で毎日のお出かけが楽しくなります。ラリーを通して友達もできるかも？
            </div>
          </div>
          <div className={styles.imgBadge}>
            <img src="/img/landing-page/map-badge-4.png" alt="badge" />
          </div>
        </Col>
      </Row>
    </BlockWrapper>
  </section>
);

export default TopCoco;

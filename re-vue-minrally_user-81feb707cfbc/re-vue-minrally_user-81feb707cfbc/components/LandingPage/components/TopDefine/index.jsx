// import { DURATION_ANIMATION, HEIGHT_HEADER_PC } from "@utils/landing-page";
// import { Link } from "react-scroll";
import BlockWrapper from "../BlockWrapper";
import styles from "./styles.module.scss";

const TopDefine = ({ isTop }) => (
  <section
    className={isTop ? `${styles.isTop} ${styles.main}` : styles.main}
    id="top-defines"
  >
    <BlockWrapper isTop={isTop} title="みんラリとは">
      <div className={styles.textWrap} data-aos="fade-up">
        「みんラリ」とは、みんなで楽しむチェックインラリーのこと。
        <br />
        チェックインラリーに参加したり、イベントラリーを作ったりして、みんながチェックインラリーを楽しむことができる
        <br />
        Webサービスです。スマホやパソコンがあれば、利用は無料で、個人・企業・自治体の皆様など、誰でもご参加いただけます！
      </div>
      <div className={styles.mapDefine} data-aos="fade-up">
        <img src="/img/landing-page/map-define-top.png" alt="map-define" />
      </div>
      <div className={styles.mapCheckin} data-aos="fade-up">
        <div className={styles.mapCheckinTitle}>チェックインラリーとは</div>
        <div className={styles.textDetail}>
          複数のスポット（場所）を登録し、そのスポットを巡る遊びのこと。
          <br className={styles.onlySp} />
          登録されたスポット全部を巡ることで、いろんな場所を訪れたり、
          訪れた場所の写真を記録して楽しむことができます。
        </div>
        <div className={styles.mapCheckinTitle}>ラリーマスター</div>
        <div className={styles.textDetail}>
          チェックインラリーを作る人のことを、みんラリでは「ラリーマスター」と呼んでいます。
          <br />
          自分に得意なことが有る方、地域について詳しいかたなど、ぜひチェックインラリーを一緒に作ってみませんか。
          <br />
          みなさまのご参加をお待ちしております！
          <br />
          ※ラリーマスターとなるためには、審査を行っています。ただいま事前応募受付中です！
        </div>
      </div>
      {/* <div className={styles.signup} data-aos="fade-up">
        <Link
          to="accept-rally"
          spy
          smooth
          offset={-HEIGHT_HEADER_PC}
          duration={DURATION_ANIMATION}
        >
          <button type="button">ラリーマスター事前登録受付中！</button>
        </Link>
      </div> */}
    </BlockWrapper>
  </section>
);

export default TopDefine;

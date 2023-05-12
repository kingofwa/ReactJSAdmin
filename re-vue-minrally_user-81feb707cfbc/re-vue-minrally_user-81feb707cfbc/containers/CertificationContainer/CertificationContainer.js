/* eslint-disable import/no-unresolved */
// import { DATE_DOT, DATE_NIHON, TIME_DOT } from "@utils/date";
// import moment from "moment-timezone";
// import { CustomButton } from "@components/common/buttons";
import { Image, Spin } from "antd";
import { useRouter } from "next/router";
import PATHS from "@config/paths";
import { useEffect } from "react";
import styles from "./styles.module.scss";

const CertificationContainer = ({ certificate }) => {
  const router = useRouter();
  const isRally = certificate?.fromable_type === "Game";

  // const onGoDetail = () => {
  //   if (isRally) {
  //     router.push(
  //       PATHS.rallyDetail.replace(/\[id\]/, certificate?.fromable_id)
  //     );
  //   } else {
  //     router.push({
  //       pathname: PATHS.series,
  //       query: {
  //         id: certificate?.fromable_id
  //       }
  //     });
  //   }
  // };

  useEffect(() => {
    if (isRally) {
      router.push(
        PATHS.rallyDetail.replace(/\[id\]/, certificate?.fromable_id)
      );
    } else {
      router.push({
        pathname: PATHS.series,
        query: {
          id: certificate?.fromable_id
        }
      });
    }
  }, [isRally]);

  return (
    <Spin spinning>
      <div className={styles.certificatePage}>
        <Image src={certificate?.image_url} />
        {/* <img
          src="/img/certification-detail.png"
          alt="cert"
          className={styles.certBg}
        />
        <div className={styles.head}>
          <h2 className={styles.headName}>{certificate?.fromable_name}</h2>
          <Row className={styles.headComplete}>完 走</Row>
          <Row className={styles.headCongratulations}>
            おめでとうございます！
          </Row>
          <Row className={styles.headDetail}>
            制覇日時
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(DATE_DOT)}
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(TIME_DOT)}
            ({certificate?.turn_number}回目)
            <br />
            制覇タイム {certificate?.time_finished_string}
          </Row>
        </div>

        <div className={styles.certificate}>
          <Row className={styles.title}>{certificate?.name}</Row>
          <Row className={styles.rallyName}>{certificate?.fromable_name}</Row>
          <Row className={styles.playerName}>{certificate?.player_name}</Row>
          <Row className={styles.completed}>{certificate?.description}</Row>
          <Row className={styles.date}>
            {moment(certificate?.finished_at)
              .tz("Asia/Tokyo")
              .format(DATE_NIHON)}
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(TIME_DOT)}
          </Row>
          <Row className={styles.desc}>
            あなたは、{certificate?.fromable_name}
            を制覇いたしましたことをここに表彰いた します。
          </Row>
          <Row className={styles.signature}>
            {moment(certificate?.finished_at)
              .tz("Asia/Tokyo")
              .format(DATE_NIHON)}
            <br /> {certificate?.fromable_name} <br />
            {certificate?.owner_name}
          </Row>
          <div className={styles.number}>No.{certificate?.cert_no}</div>
        </div>

        <Row justify="center">
          <CustomButton size="middle" variant="submit" onClick={onGoDetail}>
            {isRally ? "ラリートップへ戻る" : "グランドラリートップへ戻る"}
          </CustomButton>
        </Row> */}
      </div>
    </Spin>
  );
};

export default CertificationContainer;

/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import ModalShare from "@containers/CreateRallyPublicCompletedContainer/ModalShare";
import { ParentType } from "@utils/constants";
import { DATE_DOT, DATE_NIHON, TIME_DOT } from "@utils/date";
import { Modal, Row } from "antd";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./styles.module.scss";

// screen: rally_制覇モーダル_sp

const CompletedModal = ({ visible, hideModal, certificate }) => {
  const [showModalShare, setShowModalShare] = useState(false);

  const hasCoupon = !!certificate?.coupon;
  const router = useRouter();

  const goCouponDetail = () => {
    hideModal();
    router.push({
      pathname: PATHS.couponDetail,
      query: { id: certificate?.coupon?.id }
    });
  };

  const onGoDetail = () => {
    hideModal();
    if (certificate?.from?.type === ParentType.GAME) {
      router.push({
        pathname: PATHS.rallyDetail,
        query: {
          id: certificate?.from?.id
        }
      });
    } else {
      router.push({
        pathname: PATHS.series,
        query: {
          id: certificate?.from?.id
        }
      });
    }
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.completedModal}
        visible={visible}
        onCancel={hideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
        closeIcon={
          <img
            className={styles.closeIcon}
            alt="ic"
            src="/icons/ic-close-white.png"
          />
        }
      >
        <div className={styles.head}>
          <h2 className={styles.headName}>{certificate?.from?.name}</h2>
          <Row className={styles.headComplete}>完 走</Row>
          <Row className={styles.headCongratulations}>
            おめでとうございます！
          </Row>
          <Row className={styles.headDetail}>
            制覇日時　
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(DATE_DOT)}
            　
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(TIME_DOT)}
            　(
            {certificate?.turn_number}回目)
            <br />
            制覇タイム　{certificate?.time_finished_string}
          </Row>
        </div>

        {hasCoupon && (
          <Row justify="center">
            <CustomButton
              size="middle"
              variant="primary"
              className={styles.couponBtn}
              onClick={goCouponDetail}
            >
              制覇報酬を確認する
            </CustomButton>
          </Row>
        )}

        <div className={styles.certificate}>
          <Row className={styles.title}>{certificate?.name}</Row>
          <Row className={styles.rallyName}>{certificate?.from?.name}</Row>
          <Row className={styles.playerName}>{certificate?.player_name}</Row>
          <Row className={styles.completed}>{certificate?.description}</Row>
          <Row className={styles.date}>
            {moment(certificate?.finished_at)
              .tz("Asia/Tokyo")
              .format(DATE_NIHON)}
            　
            {moment(certificate?.finished_at).tz("Asia/Tokyo").format(TIME_DOT)}
          </Row>
          <Row className={styles.desc}>
            あなたは、{certificate?.from?.name}
            を制覇いたしましたことをここに表彰いた します。
          </Row>
          <Row className={styles.signature}>
            {moment(certificate?.finished_at)
              .tz("Asia/Tokyo")
              .format(DATE_NIHON)}
            <br /> {certificate?.from?.name} <br />
            {certificate?.from?.owner_name}
          </Row>
          <div className={styles.number}>No.{certificate?.cert_no}</div>
        </div>

        <Row justify="center">
          <CustomButton
            size="middle"
            variant="submit"
            onClick={onGoDetail}
            className={styles.button}
          >
            {certificate?.from?.type === ParentType.GAME
              ? "ラリートップへ戻る"
              : "グランドラリートップへ戻る"}
          </CustomButton>
        </Row>

        <Row justify="center">
          <CustomButton
            size="middle"
            variant="primary"
            onClick={() => setShowModalShare(true)}
            className={styles.button}
          >
            <img
              className={styles.shareIcon}
              alt="ic"
              src="/icons/ic-share-white.png"
            />
            制覇記録をシェアする
          </CustomButton>
        </Row>
      </Modal>
      <ModalShare
        visible={showModalShare}
        onClose={() => setShowModalShare(false)}
        urlShare={
          process.env.NEXT_PUBLIC_APP_HOST +
          PATHS.certificationDetail.replace(/:id/, certificate?.id)
        }
        title="表彰状をシェアする"
      />
    </div>
  );
};

export default CompletedModal;

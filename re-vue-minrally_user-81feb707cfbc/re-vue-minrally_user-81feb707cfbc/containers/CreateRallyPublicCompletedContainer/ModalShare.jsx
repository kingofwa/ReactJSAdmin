// import PATHS from "@config/paths";
import { Col, Drawer, message, Row } from "antd";
// import { useRouter } from "next/router";
// import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  // FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon
} from "react-share";
import styles from "./styles.module.scss";

const ModalShare = ({
  visible,
  onClose,
  urlShare = "",
  title = "ラリーページをシェアする"
}) => {
  // const route = useRouter();
  // const rallyId = route?.query?.rallyId;

  // const getLink = () => {
  // if (isShareRally) {
  //   return `${window.location.hostname}/${PATHS.rally}/${rallyId}`;
  // }
  // return urlShare || "";
  // };

  return (
    <div>
      <Drawer
        className={styles.modalShare}
        placement="bottom"
        onClose={onClose}
        visible={visible}
        closable={false}
        height="35vh"
      >
        <span onClick={onClose} className={styles.closeIcon}>
          <img src="/img/create-rally/close.png" alt="close" />
        </span>
        <Row justify="center" className={styles.modalTitle}>
          {title}
        </Row>
        <Row justify="space-between mt-5">
          <Col className={styles.shareItem}>
            <CopyToClipboard
              text={urlShare}
              onCopy={() => message.success("URLをコピーしました!")}
            >
              <div className={styles.shareButton}>
                <img src="/img/create-rally/share.png" alt="share" />
                リンクをコピー
              </div>
            </CopyToClipboard>
          </Col>
          <Col className={styles.shareItem}>
            <TwitterShareButton url={urlShare} className={styles.shareButton}>
              <TwitterIcon round />
              <span>Twitter</span>
            </TwitterShareButton>
          </Col>
          <Col className={styles.shareItem}>
            <LineShareButton url={urlShare} className={styles.shareButton}>
              <LineIcon round />
              <span>LINE</span>
            </LineShareButton>
          </Col>
          <Col className={styles.shareItem}>
            <FacebookShareButton url={urlShare} className={styles.shareButton}>
              {/* <FacebookIcon round bgStyle={{fill: '#1777F2'}}/> */}
              <img src="/img/create-rally/facebook.svg" alt="share-fb" />
              <span>Facebook</span>
            </FacebookShareButton>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
};

export default ModalShare;

/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { Modal, Row } from "antd";
import styles from "./styles.module.scss";

const AboutGrandModal = ({ visible, hideModal }) => {
  return (
    <Modal
      className={styles.aboutGrandModal}
      visible={visible}
      onCancel={hideModal}
      width="100%"
      wrapClassName={styles.modalContainer}
      footer={null}
    >
      <Row className={styles.title}> グランドラリーについて</Row>

      <Row className={styles.description}>
        作成したラリーをグランドラリーに付属させる機能です。
        スポット数の多いラリーは、分割してラリーを作成し、グランド
        ラリーに紐づけることで１つのラリーとして扱うことが可能です。
        また、グランドラリーにも制覇報酬をつけることが可能です。
      </Row>
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div className={styles.list}>
            <div className={styles.item}>
              <span>ラリーA</span>
            </div>
            <div className={styles.item}>
              <span>ラリーB</span>
            </div>
            <div className={styles.item}>
              <span>ラリーC</span>
            </div>
            <div className={styles.item}>
              <span>ラリーD</span>
            </div>
          </div>
          <div className={styles.about}>
            関連するラリーを１つにまとめて大きい1つのラリーを作成！
          </div>
        </div>
        <div className={styles.mainBottom}>
          <div className={styles.arrowDown} />
          <div className={styles.content}>
            <div className={styles.contentTitle}>グランドラリー</div>
            <div className={styles.list}>
              <div className={styles.item}>
                <span>ラリーA</span>
              </div>
              <div className={styles.item}>
                <span>ラリーB</span>
              </div>
              <div className={styles.item}>
                <span>ラリーC</span>
              </div>
              <div className={styles.item}>
                <span>ラリーD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutGrandModal;

import { DATE_DOT } from "@utils/date";
import { Col, Row } from "antd";
import moment from "moment";
import React from "react";
import styles from "./RallyContainer.module.scss";
import RallyDescription from "./RallyDescription";
import RallyInfo from "./RallyInfo";
import RallyPrecautions from "./RallyPrecautions";

const RallyContainer = ({ game }) => {
  return (
    <>
      <RallyInfo game={game} />
      <div className={styles.rallyInfo}>
        <Row className={styles.rallyRow}>
          <span className={styles.rallyInfoTitle}>ラリー情報</span>
        </Row>

        <Row className={styles.rallyRow}>
          <Col span={8} className={styles.rallyLabel}>
            スポット数
          </Col>
          <Col span={16} className={styles.rallyText}>
            {game?.number_of_spots}箇所
          </Col>
        </Row>

        <Row className={styles.rallyRow}>
          <Col span={8} className={styles.rallyLabel}>
            移動距離
          </Col>
          <Col span={16} className={styles.rallyText}>
            約{(game?.moving_distance?.closest / 1000)?.toFixed(1)}km〜
            {(game?.moving_distance?.farthest / 1000).toFixed(1)}km
          </Col>
        </Row>

        <Row className={styles.rallyRow}>
          <Col span={8} className={styles.rallyLabel}>
            制覇報酬
          </Col>
          <Col span={16} className={styles.rallyText}>
            賞状画像
          </Col>
        </Row>

        {game?.serie?.name && (
          <Row className={styles.rallyRow}>
            <Col span={8} className={styles.rallyLabel}>
              グランドラリー
            </Col>
            <Col span={16} className={styles.rallyLabelPrimary}>
              {game?.serie?.name}
            </Col>
          </Row>
        )}

        <Row className={styles.rallyRow}>
          <Col span={8} className={styles.rallyLabel}>
            公開日
          </Col>
          <Col span={16} className={styles.rallyText}>
            {moment().format(DATE_DOT)}
          </Col>
        </Row>
      </div>
      <RallyDescription game={game} />
      <RallyPrecautions
        note={game?.note}
        noteUpdatedAt={game?.note_updated_at}
      />
    </>
  );
};

export default RallyContainer;

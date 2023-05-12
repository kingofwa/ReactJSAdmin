/* eslint-disable no-irregular-whitespace */
import PATHS from "@config/paths";
import { SPOT_STATUS } from "@utils/constants";
import { Button, Col, Row } from "antd";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const SpotItem = ({ item, onDelSpot, isInValidList, isEdit }) => {
  const router = useRouter();

  const rallyId = router?.query?.id;

  const handClick = spotId => {
    const spotUrl = `${PATHS.rallyCreateSpotDetail.replace(
      /:spotId/,
      spotId
    )}?isEdit=${isEdit}`;
    const url = `${spotUrl}&rallyId=${rallyId}`;
    router.push(url);
  };

  const isInValidItem =
    isInValidList && item.status !== SPOT_STATUS.registrations;

  return (
    <Row className={styles.spotItem}>
      <Col span={13} className={styles.spotName}>
        {item?.name}
      </Col>
      <Col span={11} className={styles.option}>
        {/* <div className={`${isDisabled ? styles.unregistered : ""}`}>登録済</div> */}
        <div
          className={
            isInValidItem ? styles.isUnregistered : styles.unregisteredd
          }
        >
          {item.status === SPOT_STATUS.registrations ? "登録済" : ""}
          {item.status === SPOT_STATUS.unregistered ? "未登録" : ""}
          {item.status === SPOT_STATUS.draft ? "下書き" : ""}
        </div>
        <Button className={styles.btnEdit} onClick={() => handClick(item?.id)}>
          編 集
        </Button>
        <div className={styles.btnDelete} onClick={() => onDelSpot(item?.id)}>
          <img src="/icons/ic-basket.png" alt="btnDelete" />
        </div>
      </Col>
    </Row>
  );
};

export default SpotItem;

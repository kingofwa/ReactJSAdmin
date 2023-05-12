/* eslint-disable no-irregular-whitespace */ // temp data-fake
import { CustomButton } from "@components/common/buttons";
import { Modal, Radio, Row, Space } from "antd";
import { useState } from "react";
import styles from "./styles.module.scss";

// screen: rally_tab2-6チェックインできない_sp

const SpotListModal = ({
  visible,
  hideModal,
  spots,
  onCheckinOneSpot = () => {}
}) => {
  const [spotSelected, setSpotSelected] = useState(false);

  const onChangeSpot = e => {
    setSpotSelected(e.target.value);
  };

  const onCheckin = () => {
    onCheckinOneSpot(spotSelected);
  };

  const onHideModal = () => {
    hideModal();
    setSpotSelected(false);
  };

  return (
    <div className={styles.modalContainer}>
      <Modal
        className={styles.spotListModal}
        visible={visible}
        onCancel={onHideModal}
        width="100%"
        wrapClassName={styles.modalContainer}
        footer={null}
      >
        <Row className={styles.title}>
          チェックイン可能なスポットが複数あります。
        </Row>

        <Row className={styles.description}>
          以下よりチェックインするスポットを選択してください。
        </Row>
        <Radio.Group className={styles.radioGroup} onChange={onChangeSpot}>
          <Space direction="vertical">
            {spots?.map(spot => (
              <Radio key={spot.id} value={spot.id}>
                {spot?.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>

        <Row justify="center">
          <CustomButton
            size="middle"
            className={styles.btnSubmit}
            onClick={onCheckin}
          >
            <img src="/icons/ic-check-black.png" alt="ic-check" />
            チェックイン
          </CustomButton>
        </Row>
      </Modal>
    </div>
  );
};

export default SpotListModal;

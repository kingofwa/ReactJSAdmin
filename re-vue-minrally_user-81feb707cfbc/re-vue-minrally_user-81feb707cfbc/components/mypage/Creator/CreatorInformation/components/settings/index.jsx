import { Button, Col, Row } from "antd";
import React from "react";
import styles from "./style.module.scss";

const SettingCreator = ({ setting }) => {
  return (
    <div className={styles.setting}>
      {setting.map(item => (
        <Row className={styles.settingItem} key={item.id}>
          <Col span={7} className={styles.title}>
            {item.title}
          </Col>
          <Col span={12} className={styles.value}>
            {item.value}
          </Col>
          <Col span={5}>
            <Button className={styles.btnSetting} onClick={item.onClick}>
              {item.btnText}
            </Button>
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default SettingCreator;

import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import React from "react";
import styles from "./FaqItem.module.scss";

const { Panel } = Collapse;

const CollapseWrapper = ({ data }) => {
  const headerElement = (
    <div>
      <span className={styles.title}>{data?.title}</span>
    </div>
  );
  return (
    <Collapse
      defaultActiveKey={0}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined
          rotate={isActive ? -90 : 90}
          className={styles.iconArrow}
        />
      )}
      className={styles.collapse}
    >
      <Panel header={headerElement}>
        <div className={styles.content}>{data?.content}</div>
      </Panel>
    </Collapse>
  );
};

export default CollapseWrapper;

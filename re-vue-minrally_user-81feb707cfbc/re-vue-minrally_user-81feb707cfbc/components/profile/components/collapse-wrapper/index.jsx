import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import React from "react";
import styles from "./style.module.scss";

const { Panel } = Collapse;

const CollapseWrapper = ({ title, subTitle ,children}) => {
  const headerElement = (
    <div>
      <span className={styles.title}>{title}</span>
      {subTitle && <span className={styles.subTitle}>{subTitle}</span>}
    </div>
  );
  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : -90} className={styles.iconArrow} />
      )}
      className={styles.collapse}
    >
      <Panel header={headerElement} key="1">
      {children}
      </Panel>
    </Collapse>
  );
};

export default CollapseWrapper;

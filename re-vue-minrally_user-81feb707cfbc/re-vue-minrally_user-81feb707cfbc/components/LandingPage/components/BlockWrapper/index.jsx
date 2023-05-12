import { Row } from "antd";
import styles from "./styles.module.scss";

const BlockWrapper = ({ children, title, isTop, is18px = false }) => {
  return (
    <div
      className={
        isTop ? `${styles.isTop} ${styles.blockWrapper}` : styles.blockWrapper
      }
    >
      <Row className={styles.title} align="middle">
        <img
          src="/img/landing-page/ic-vector.png"
          alt="icon-vector"
          className={styles.icVector}
        />
        <h2 className={is18px && styles.is18px}>{title}</h2>
      </Row>
      {children}
    </div>
  );
};

export default BlockWrapper;

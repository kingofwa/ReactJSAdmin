import { BackTop } from "antd";
import styles from "./styles.module.scss";

const BackToTop = () => {
  return (
    <>
      <div className={styles.backToTop}>
        <BackTop>
          <div>
            {/* <div className={styles.content}>
              <img
                src="/icons/ic-top.svg"
                alt="ic-top"
                className={styles.icTop}
              />
              PAGE TOP
            </div> */}

            <div className={styles.content}>
              <img
                src="/icons/ic-top.svg"
                alt="ic-top"
                className={styles.icTop}
              />
            </div>
          </div>
        </BackTop>
      </div>
    </>
  );
};

export default BackToTop;

import React from "react";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const HeaderBack = ({ title, backUrl, hasMenu }) => {
  const router = useRouter();

  const onClickBack = () => {
    if (backUrl) {
      router.replace(backUrl);
    } else {
      router.back();
    }
  };
  return (
    <>
      <div className={hasMenu ? styles.headHistoryMenu : styles.headHistory}>
        <div onClick={onClickBack} className={styles.goBack}>
          <img
            src="/img/mypage/ic-back.svg"
            alt="arrow left"
            className={styles.imgBack}
          />
        </div>
        {title}
      </div>
    </>
  );
};

export default HeaderBack;

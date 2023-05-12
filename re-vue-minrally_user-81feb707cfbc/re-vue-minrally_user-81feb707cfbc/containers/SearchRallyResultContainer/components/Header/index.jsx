import { size } from "lodash";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const HeaderSearchResult = ({ title, keySearch }) => {
  const router = useRouter();
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headHistory}>
        <div onClick={() => router.back()} className={styles.goBack}>
          <img
            src="/img/mypage/ic-back.svg"
            alt="arrow left"
            className={styles.imgBack}
          />
        </div>
        {title}
      </div>
      <div className={styles.conditons}>
        <div className={styles.contentType}>
          {size(keySearch) > 0 ? keySearch : "フリーワード,全てのエリア"}
        </div>
        {/* <Button className={styles.btnCondition}>条件変更</Button> */}
      </div>
    </div>
  );
};

export default HeaderSearchResult;

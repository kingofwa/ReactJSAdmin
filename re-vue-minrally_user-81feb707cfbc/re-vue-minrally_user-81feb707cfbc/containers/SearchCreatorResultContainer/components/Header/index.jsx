import { size } from "lodash";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

const HeaderSearchResult = ({ title, keyword }) => {
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
          {size(keyword) > 0 ? keyword : "フリーワード,全てのエリア"}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearchResult;

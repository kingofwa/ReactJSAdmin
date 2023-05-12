import UserInfo from "@components/mypage/components/UserInfo";
import PATHS from "@config/paths";
import Link from "next/link";
import styles from "./styles.module.scss";

const CreatorBeforeRegis = () => {
  return (
    <>
      <UserInfo />

      <div className={styles.resgisWrapper}>
        <div className={styles.desc}>
          {/* クリエイターとして参加するには、クリエイター申請が必要です。以下よりクリエイター申請を行ってください。 */}
          ラリーマスターとして参加するには、ラリーマスター申請が必要です。
          以下よりラリーマスター申請を行ってください。
        </div>
        <Link href={`${PATHS.mypageCreator}${PATHS.createAppInfo}`}>
          <a className={styles.btnRegis}>ラリーマスター申請</a>
        </Link>
      </div>
    </>
  );
};

export default CreatorBeforeRegis;

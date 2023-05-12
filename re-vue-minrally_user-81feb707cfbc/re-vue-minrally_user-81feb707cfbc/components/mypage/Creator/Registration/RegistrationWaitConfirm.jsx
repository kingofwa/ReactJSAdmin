import UserInfo from "@components/mypage/components/UserInfo";
import styles from "./styles.module.scss";

const RegistrationWaitConfirm = () => {
  return (
    <>
      <UserInfo />

      <div className={styles.resgisWrapper}>
        <div className={styles.desc}>
          申請内容を確認中です。今しばらくお待ちください。
        </div>
      </div>
    </>
  );
};

export default RegistrationWaitConfirm;

import { CustomButton } from "@components/common/buttons";
import PATHS from "@config/paths";
import { Row } from "antd";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const Login = () => {
  const router = useRouter();
  const { redirectTo = PATHS.home } = router.query;

  // const onLoginTwitter = () => {
  //   const loginRoute = `${PATHS.loginTwitter}?redirectTo=${redirectTo}`;
  //   router.push(loginRoute);
  // };

  const onLoginLine = () => {
    const loginRoute = `${PATHS.loginLine}?redirectTo=${redirectTo}`;
    router.push(loginRoute);
  };

  const onLoginGoogle = () => {
    const redirectPath = `${PATHS.loginGoogle}?redirectTo=${redirectTo}`;
    router.push(redirectPath);
  };

  return (
    <div className={styles.authForm}>
      <Row className={styles.helpText}>SNSアカウントでログイン</Row>

      {/* <CustomButton
        className={styles.btnTwitter}
        onClick={onLoginTwitter}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/twitter-logo.png"
          alt="twitter-logo"
        />
        Twitterでログイン
      </CustomButton> */}
      <CustomButton
        className={styles.btnLine}
        onClick={onLoginLine}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/line-logo.png"
          alt="line-logo"
        />
        LINEでログイン
      </CustomButton>
      <CustomButton
        className={styles.btnGoogle}
        onClick={onLoginGoogle}
        variant="community"
      >
        <img
          className={styles.logo}
          src="/img/auth/google-logo.svg"
          alt="google-logo"
        />
        Googleでログイン
      </CustomButton>
    </div>
  );
};

export default Login;

import PATHS from "@config/paths";
import { useRouter } from "next/router";
import styles from "./style.module.scss";

const Banner = () => {
  const router = useRouter();
  const goHome = () => {
    router.push(PATHS.home);
  };

  return (
    <div className={styles.bannerContainer}>
      <img
        className={styles.banner}
        src="/img/landing-page/new-banner-pc.png"
        alt="banner"
      />
      <img
        className={styles.bannerMobile}
        src="/img/landing-page/new-banner-mobile.png"
        alt="banner"
      />
      <div className={styles.btnHome} onClick={goHome} />
    </div>
  );
};

export default Banner;

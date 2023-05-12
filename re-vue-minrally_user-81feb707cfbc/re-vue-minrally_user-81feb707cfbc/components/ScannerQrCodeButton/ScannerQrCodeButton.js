import { DELAY_ANIMATION, DURATION_ANIMATION } from "@utils/landing-page";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";

const ScannerQrCodeButton = ({ onClick }) => {
  const [y, setY] = useState();
  const [isScroll, setIsScroll] = useState(false);

  const handleNavigation = useCallback(
    e => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setIsScroll(true);
      } else if (y < window.scrollY) {
        setIsScroll(true);
      }
      setY(window.scrollY);
      setTimeout(() => {
        setIsScroll(false);
      }, 1500);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  return (
    <div className={styles.ScannerQrCodeButton}>
      <div
        className={isScroll ? styles.ButtonScannerScroll : styles.ButtonScanner}
        onClick={onClick}
        data-aos="zoom-out-up"
        data-aos-duration={DURATION_ANIMATION}
        data-aos-delay={DELAY_ANIMATION}
      >
        <img src="/img/qr-code-scan.png" alt="qr-code" />
        QRコードでチェックイン
      </div>
    </div>
  );
};

export default ScannerQrCodeButton;

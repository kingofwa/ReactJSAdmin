import Scroll from "react-scroll";
import styles from "./PageTopFooter.module.scss";

const PageTopFooter = () => {
  const scroll = Scroll.animateScroll;

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pageTop} onClick={scrollToTop}>
        <img src="/icons/ic-top.svg" alt="ic-top" className={styles.icTop} />
        PAGE TOP
      </div>
      <div className={styles.minrally}>©️みんラリ</div>
    </footer>
  );
};

export default PageTopFooter;

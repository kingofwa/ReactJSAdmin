import Link from "next/link";
import styles from "./index.module.scss";

const ViewMoreLink = ({ href, ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={href}>
        <a className={styles.link} {...rest}>
          もっと見る
        </a>
      </Link>
    </div>
  );
};

export default ViewMoreLink;

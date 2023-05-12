import styles from "./index.module.scss";

const Img = ({ src, alt, className }) => {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img src={src} alt={alt} className={styles.img} />
    </div>
  );
};

export default Img;
